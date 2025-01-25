import connectMongo from "@/lib/mongodb";
import Reviews from "@/models/Reviews";
import { NextRequest,NextResponse } from "next/server";

interface Params{
    params:{id:string};
}

export async function UPDATE(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const {id} = await params;
        const requestBody = await request.json();
        const {
            reviewtext,
            rating,
            tags
        } = requestBody;

        if([reviewtext,tags].some((field)=>field?.trim()==="")){
            return NextResponse.json({message:"Fields are mmissing"},{status:401});
        }
        
        if(!rating){
            return NextResponse.json({message:"rating is missing"},{status:401});
        }

        //No need no more thank you

    } catch (error) {
        
    }
}