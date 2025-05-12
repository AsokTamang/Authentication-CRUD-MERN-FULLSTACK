import express from 'express'
import { SignIn,SignUp } from '../controllers/auth.controller.js';

export const authRoute=express.Router();

authRoute.post('/signup',SignUp)
authRoute.post('/signin',SignIn)