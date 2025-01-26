import mongoose from "mongoose";
import connectMongo from "@/lib/mongodb";
import Infrastructure from "@/models/Infrastructure";
import Survey from "@/models/Survey";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await connectMongo();
        const requestbody = await request.json();
        const {
            ofschool,
            numberofclass,
            numberoflabs,
            numberofcomputers,
            numberoftransport,
            playgroundarea,
            numberofseats,
            numberoffans,
            numberofbooks,
            ventilationperroom,
            numberofstaffroom,
            numberoftoilet,
            sanitization,
            firsaid,
            firesafety
        } = requestbody;

        if(!mongoose.Types.ObjectId.isValid(ofschool)){
            return NextResponse.json({message:"Invalid Object Id"},{status:400})
        }

        const newInfraS = await Infrastructure.create({
            ofschool,
            numberofclass,
            numberoflabs,
            numberofcomputers,
            numberoftransport,
            playgroundarea,
            numberofseats,
            numberoffans,
            numberofbooks,
            ventilationperroom,
            numberofstaffroom,
            numberoftoilet,
            sanitization,
            firsaid,
            firesafety
        })
        
        if(!newInfraS){
            return NextResponse.json({message:"Infrastructure adding failed"},{status:500})
        }

        await Survey.findOneAndUpdate({SchoolDoc:ofschool},{InfrastructureDoc:newInfraS._id});

        return NextResponse.json({message:"Infrastructure created successful",data:newInfraS},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server during performance survey"},{status:500})
    }
}