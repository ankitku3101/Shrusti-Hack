import mongoose from "mongoose";
import Survey from "@/models/Survey";
import connectMongo from "@/lib/mongodb";
import School from "@/models/School";
import { NextRequest,NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(request:NextRequest){
    try {
        await connectMongo();

        const requestBody = await request.json();
        const {
            email,
            password,
            username,
            contact,
            schoolname,
            location,
            numberofstudents,
            numberofteacher
        } = requestBody;

        if(!email){
            return NextResponse.json({error:"email not found"},{status:400})
        }
        if(!password){
            return NextResponse.json({error:"password not found"},{status:400})
        }
        if(!username){
            return NextResponse.json({error:"username not found"},{status:400})
        }

        const hashedPassword = await hash(password,10);
        
        const newSchool = await School.create({
            email,
            password:hashedPassword,
            username,
            contact,
            schoolname,
            location,
            numberofstudents,
            numberofteacher
        })

        if(!newSchool){
            return NextResponse.json({message:"Error in creating school"},{status:500})
        }

        await Survey.create({SchoolDoc:newSchool._id});

        return NextResponse.json({message:"School registered Successfully",data:newSchool},{status:200});

    } catch (error) {
        return NextResponse.json({error:error.message||"Error while registering school"},{status:500})
    }
}