import mongoose from "mongoose";
import School from "@/models/School";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();

        const onlySchoolNameId = await School.aggregate([
            {
                $project:{
                    _id:1,
                    schoolname:1,
                    location:1
                }
            }
        ])

        if(!onlySchoolNameId){
            return NextResponse.json({message:"Data fetching failed"},{status:404});
        }

        return NextResponse.json({message:"Data fetch successful",data:onlySchoolNameId},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Error issue while Data fetching"},{status:500});
    }
}