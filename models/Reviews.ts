import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        ofschool:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"School",
            required:true,
        },
        reviewtext:{
            type:String,
            required:true,
            minlength:10,
            maxlength:1000
        },
        rating:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10."]
        },
        tags:{
            type:[
                String
            ],
            enum:['Infrastructure','Performace','Satisfaction','Overall','Activity']
        },
        helpfulvote:{
            type:Number,
            default:0,
            min:[0,"Number can not be negative"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.Reviews || mongoose.model("Review",ReviewSchema);