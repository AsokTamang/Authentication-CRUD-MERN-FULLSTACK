import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import { userModel } from '../models/user.model.js';
dotenv.config();

const JWT_TOKEN=process.env.SECRET_KEY;
export const auth=async(req,res,next)=>{
    try{
    
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];   //here we are splitting the req.headers.authorization part at the space which makes an array consisting of Bearer and the actual token

            
        }
        const decoded=jwt.verify(token,JWT_TOKEN)   //here we are verifying with the secret key with the token entered ny the user.
       
        const validUser=await userModel.findById(decoded.userId)   //here we are checking if user exist or not with the valid token.
        if(!validUser){
            const error=new Error('User doesnot exist')
            return res.status(404).json({success:false,message:error})
        }

        req.user=decoded
        next();

    }
    catch(err){
        next(err);
    }
}