import mongoose from "mongoose";
import Performace from "@/models/Performace";
import connectMongo from "@/lib/mongodb";
import { NextResponse,NextRequest } from "next/server";

interface Params{
    params:{id:String}
}

export async function PATCH(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const requestbody = await request.json();
        const {OVERALLRATE} = requestbody;
        const {id} = await params;

        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return NextResponse.json({message:"Invalid object id"},{status:400});
        }

        if(!OVERALLRATE){
            return NextResponse.json({message:"Invalid input"},{status:400});
        }

        const updatedPerformaceSurvey = await Performace.findOneAndUpdate({_id:id},{OVERALLRATE},{new:true});

        if(!updatedPerformaceSurvey){
            return NextResponse.json({message:"Updation failed."},{status:500})
        }

        return NextResponse.json({message:"Update successful",data:updatedPerformaceSurvey},{status:200});
        
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server during performance survey"},{status:500})
    }
}