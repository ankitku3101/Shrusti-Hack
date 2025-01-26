import mongoose from "mongoose";
import Performace from "@/models/Performace";
import Survey from "@/models/Survey";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

export async function POST(request:NextRequest){
    try {
        await connectMongo();
        const requestbody = await request.json();
        const {
            ofschool,
            studentmark,
            sportsrewards,
            punctuality,
            artsrewards,
            literacyrewards,
            culturalrewards,
            teacherpersubject,
            enrolledstudents,
        } = requestbody;

        if(!mongoose.Types.ObjectId.isValid(ofschool)){
            return NextResponse.json({message:"Invalid object id"},{status:400})
        }

        const isFieldValid = (value) =>
            value !== null && value !== undefined && !isNaN(value);

        const allValid = Object.values({
            sportsrewards,
            punctuality,
            artsrewards,
            literacyrewards,
            culturalrewards,
            teacherpersubject,
            enrolledstudents
        }).every(isFieldValid);

        if(!allValid){
            return NextResponse.json({message:"Some fields are invalid."},{status:400})
        }

        const newPerfomanceSurvey = await Performace.create({
            ofschool,
            studentmark,
            sportsrewards,
            punctuality,
            artsrewards,
            literacyrewards,
            culturalrewards,
            teacherpersubject,
            enrolledstudents,
        })

        if(!newPerfomanceSurvey){
            return NextResponse.json({message:"Performance Survey Creation failed"},{status:500});
        }

        await Survey.findOneAndUpdate({SchoolDoc:ofschool},{
            PerformanceDoc:newPerfomanceSurvey._id
        })

        return NextResponse.json({message:"Performance Survey added",data:newPerfomanceSurvey},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server during performance survey"},{status:500})
    }
}