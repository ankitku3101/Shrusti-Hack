import mongoose from "mongoose";
import Survey from "@/models/Survey";
import Satisfaction from "@/models/Satisfaction";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await connectMongo();
        const requestbody = await request.json();
        const {
            ofschool,
            clarity,
            resses,
            evaluation,
            studymaterial,
            safety,
            extracurricular,
            environment
        } = requestbody;

        if(!mongoose.Types.ObjectId.isValid(ofschool)){
            return NextResponse.json({message:"Invalid Object Id"},{status:401})
        }

        const isFieldValid = (value) =>
            value !== null && value !== undefined && !isNaN(value);
        
        const allValid = Object.values({clarity,resses,evaluation,studymaterial,safety,extracurricular}).every(isFieldValid);

        if(!allValid){
            return NextResponse.json({message:"Some fields are invalid."},{status:400})
        }

        const newSatisfaction = await Satisfaction.create({
            ofschool,
            clarity,
            resses,
            evaluation,
            studymaterial,
            safety,
            extracurricular,
            environment
        })

        await Survey.findOneAndUpdate({SchoolDoc:ofschool},{
            $push:{Satisfcation:newSatisfaction._id}
        },{new:true})

        if(!newSatisfaction){
            return NextResponse.json({message:"Survey Creation failed"},{status:500})
        }

        return NextResponse.json({message:"Satisfaction Survey accepted! Thank you",data:newSatisfaction},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server erro"},{status:500})
    }
}