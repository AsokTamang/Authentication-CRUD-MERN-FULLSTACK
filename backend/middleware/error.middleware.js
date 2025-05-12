export const errorMiddleware=async(err,req,res,next)=>{
    let message=err.message
    let statusCode;
    if(err.name==="CastError"){
        statusCode=400;
        message='Invalid value for a specific type'

    }
    if(err.name==="UnauthorizedError"){
         statusCode=401;
         message='JWT token missing or invalid (from express-jwt).'

    }
    if(err.name==="Validation Error"){
         statusCode=400;
         message=Object.values(err.errors).map((value)=>value.message)
    }
    res.status(statusCode).json({message:message})


}