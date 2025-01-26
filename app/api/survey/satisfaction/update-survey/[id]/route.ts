import connectMongo from "@/lib/mongodb";
import Satisfaction from "@/models/Satisfaction";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

interface Params{
    params:{id:String}
}

export async function PATCH(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const {id} = await params;
        const requestbody = await request.json();
        const {OVERALLRATE} = requestbody

        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return NextResponse.json({message:"Invalid object id"},{status:400})
        }
        
        const newUpdatedFile = await Satisfaction.findByIdAndUpdate({_id:id},{OVERALLRATE},{new:true});

        if(!newUpdatedFile){
            return NextResponse.json({message:"Satisfaction updatation failed"},{status:500});
        }

        return NextResponse.json({message:"Updation successful",data:newUpdatedFile},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server error while updating field"},{status:500})
    }
}