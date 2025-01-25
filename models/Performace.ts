import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema(
    {
        ofschool:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"School"
        },
        studentmark:{
            type:Map,
            of:Number,
            required:true,
        },
        sportsrewards:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        punctuality:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"]
        },
        artsrewards:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        literacyrewards:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        culturalrewards:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        teacherpersubject:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        enrolledstudents:{
            /**Last year number of student enrolled.*/
            type:Number,
            min:[0,"Number can not be negative"]
        },
        OVERALLRATE:{
            type:Number,
            min:[0,"Number can not be in negative"],
            max:[10,"Number can not exceed 10"]
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.Performance || mongoose.model("Performance",PerformanceSchema);