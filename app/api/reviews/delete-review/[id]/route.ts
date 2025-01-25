import { NextRequest,NextResponse } from "next/server";
import Reviews from "@/models/Reviews";
import Survey from "@/models/Survey";
import connectMongo from "@/lib/mongodb";

interface Params{
    params:{id:string};
}

export async function DELETE(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const {id} = await params;
        const requestBody = await request.json();
        const {
            ofschool
        } = requestBody;

        await Survey.findOneAndUpdate({SchoolDoc:ofschool},{$pull:{ReviewDoc:id}},{new:true});
        await Reviews.findByIdAndDelete({_id:id});

        return NextResponse.json({message:"Successfully removed Review"});

    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error while deleteing."},{status:500});
    }
}