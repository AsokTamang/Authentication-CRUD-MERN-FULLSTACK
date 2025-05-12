import express from 'express'
import { connection } from './config/mongo.js';
import dotenv from 'dotenv'
import { authRoute } from './routes/auth.route.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { arcJet } from './middleware/arcjet.middleware.js';
import { staffRoute } from './routes/staff.route.js';
import cors from 'cors'
dotenv.config();

const PORT=process.env.PORT
const app=express();
app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json());
app.use(errorMiddleware);
app.use(arcJet)
app.use('/api/mern',authRoute)   //here we are using the authentication route which we made in another folder 
app.use('/api/mern/staff',staffRoute)    //this a CRUD route for staffs details


app.listen(PORT,()=>{
    connection();

    console.log(`server running at port ${PORT}`)})