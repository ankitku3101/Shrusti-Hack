import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
},
    {
        timestamps: true
    },
)

export default mongoose.models.Admin || mongoose.model("Admin",AdminSchema);