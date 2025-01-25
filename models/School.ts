import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
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
            required:true,
            min:[0,"Studet number can't be less than 0"]
        },
        numberofteacher:{
            type:Number,
            required:true,
            min:[0,"Studet number can't be less than 0"]
        }
    }
)

export default mongoose.models.School || mongoose.model("School",SchoolSchema);