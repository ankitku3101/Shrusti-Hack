import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const SchoolSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            lowercase:true,
            trim:true,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            trim:true,
            required:true
        },
        username:{
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        contact:{
            type:Number,
            required:true
        },
        schoolname:{
            type:String,
            lowercase:true,
            trim:true,
            required:[true,"School name must required"]
        },
        location:{
            state:{
                type:String,
                lowercase:true,
                trim:true,
                required:[true,"State must required"]
            },
            division:{
                type:String,
                lowercase:true,
                trim:true,
            },
            district:{
                type:String,
                lowercase:true,
                trim:true,
                required:[true,"District must required."]
            },
            block:{
                type:String,
                lowercase:true,
                trim:true,
            },
            town:{
                type:String,
                lowercase:true,
                trim:true,
                required:[true,"the town or village it belongs to must be required."]
            },
            city:{
                type:String,
                lowercase:true,
                trim:true,
            },
            ward:{
                type:String,
                lowercase:true,
                trim:true,
            },
        },
        numberofstudents:{
            type:Number,
            min:[0,"Studet number can't be less than 0"]
        },
        numberofteacher:{
            type:Number,
            min:[0,"Studet number can't be less than 0"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.School || mongoose.model("School",SchoolSchema);