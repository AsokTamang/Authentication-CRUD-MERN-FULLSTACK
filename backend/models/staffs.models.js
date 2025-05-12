import mongoose from "mongoose";

const staffSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:[true,'Please enter an valid id'],
        unique:true,

    }
    ,
    name:{
        type:String,
        minlenght:3,
        required:[true,'Please enter a valid name']
    },
    age:{
        type:Number,
    
        required:[true,'Please enter a valid age']
    },
    address:{
        type:String,

    
        required:[true,'Please enter a valid address']
    },
    salary:{
        type:Number,

    
        required:[true,'please enter a salary']
    },
    contact:{
        type:Number,

    
        required:[true,'please enter a valid phonenumber']
    },
},{timestamps:true})
export const Staffmodel=mongoose.model('Staff',staffSchema)   