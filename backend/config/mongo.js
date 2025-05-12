import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connection=async()=>{
    try{
       const conn= await mongoose.connect(process.env.URL) 
        if(conn) {
            console.log('mongo db connection successful')
        }

    }
    catch(Err){
        console.error(Err)
        process.exit(1)
        }
    }
