import mongoose from "mongoose";

const SatisfactionSchema = new mongoose.Schema(
    {
        ofschool:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"School"
        },
        clarity:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        resses:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        evaluation:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        studymaterial:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        safety:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        extracurricular:{
            type:Number,
            min:[0,"Number can not be negative"],
            max:[10,"Number can not exceed 10"],
        },
        environment:{
            type:String,
            enum:['Friendly',"Average",'Depressive','hostile']
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

export default mongoose.models.Satisfaction || mongoose.model('Satisfaction',SatisfactionSchema)