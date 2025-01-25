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

        if(!mongoose.Types.ObjectId.isValid(ofschool)){
            return NextResponse.json({message:"Invalid school id"},{status:401})
        }

        if([reviewtext,rating,tags].some((field)=>field?.trim()==="")){
            return NextResponse.json({message:"Some fields are missing"},{status:400})
        }

        /**
         * 
         * FastApi Pros and cons values
         */

        const ReviewObject = await Reviews.create({
            ofschool,
            reviewtext,
            rating,
            tags
        })

        const updatingSurvey = await Survey.findOneAndUpdate(
            {SchoolDoc:ofschool},
            {$push:{ReviewDoc:ReviewObject._id}},
            {new : true}
        )

        return NextResponse.json({message:"Review Created Succesfully",data:updatingSurvey},{status:201})

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