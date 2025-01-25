import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema(
    {
        SchoolDoc:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"School"
        },
        InfrastructureDoc:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Infrastructure"
        },
        PerformanceDoc:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Performance"
        },
        ReviewDoc:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reviews"
        },
        Satisfcation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Satisfaction"
        },
        FinalRating:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.Survey || mongoose.model("Survey",SurveySchema);