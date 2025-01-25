import mongoose from "mongoose";

const InfrastructureSchema = new mongoose.Schema(
    {
        schoolof:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"School"
        },
        numberofclass:{
            type:Number,
            min:[0,"number of class can not be negative"],
            required:true
        },
        numberoflabs:{
            type:Number,
            min:[0,"Number of labs can not be negative"],
            required:true
        },
        numberofcomputers:{
            type:Number,
            min:[0,"Number of computers can't be negative"],
            default:0
        },
        numberoftransport:{
            type:Number,
            min:[0,"Number of transport can't be negative"],
            default:0
        },
        playgroundarea:{
            type:Number,
            default:-1,
        },
        numberofseats:{
            type:Number,
            min:[0,"Number of chairs can't be negative"]
        },
        numberoffans:{
            type:Number,
            min:[0,"Number of fans can not be negative"]
        },
        numberofbooks:{
            type:Number,
            min:[0,"Number of books can't be negative"]
        },
        ventilationperroom:{
            type:Number,
            min:[0,"Value can not be negative"]
        },
        numberofstaffroom:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        numberoftoilet:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        sanitization:{
            type:Number,
            min:[0,"Number can not be negative"]
        },
        firsaid:{
            type:Boolean,
        },
        firesafety:{
            type:Boolean,
        },
        OVERALLRATE:{
            type:Number,
            min:[0,"Number can not be in negative"],
            max:[10,"Number can not exceed 10"]
        }
    }
)

export default mongoose.models.Infrastructure || mongoose.model("Infrastructure",InfrastructureSchema);