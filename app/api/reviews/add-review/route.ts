import dbconnect from "@/lib/mongodb";
import Reviews from "@/models/Reviews";
import Survey from "@/models/Survey";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {

        await dbconnect();

        const requestbody = await request.json();
        const {
            ofschool,
            reviewtext,
            rating,
            tags
        } = requestbody;

        // Existing validation checks...

        const ReviewObject = await Reviews.create({
            ofschool,
            reviewtext,
            rating,
            tags
        })

        const getProsandcons = await fetch(`${process.env.FAST_API_URL}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'accept':'application/json'
            },
            body: JSON.stringify({review:reviewtext})
        })

        const finalvalues = await getProsandcons.json();
        const {good,bad} = finalvalues;

        // Check if Survey exists, if not create one
        let updatingSurvey;
        if (!updatingSurvey) {
            updatingSurvey = await Survey.create({
                SchoolDoc: ofschool,
                ReviewDoc: [ReviewObject._id],
                pros: good,
                cons: bad
            });
        } else {
            updatingSurvey = await Survey.findOneAndUpdate(
                {SchoolDoc: ofschool},
                {
                    $push: { ReviewDoc: ReviewObject._id },
                    $addToSet: { 
                        pros: { $each: good },
                        cons: { $each: bad }
                    }
                },
                { new: true }
            )
        }

        return NextResponse.json({
            message: "Review Created Successfully", 
            data: {updatingSurvey, ReviewObject}
        }, {status: 201})

    } catch (error) {
        return NextResponse.json(
            {
                error:error.message || "Some error occured at creating review"
            },
            {
                status:500
            }
        )
    }
}