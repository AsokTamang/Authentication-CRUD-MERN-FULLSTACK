import express from 'express'
import { auth } from '../middleware/auth.middleware.js';
import { getController,postController,putController,deleteController,getOneController } from "../controllers/staff.controller.js";
import { authRoute } from './auth.route.js';

export const staffRoute=express.Router();

staffRoute.get('/',auth,getController)    
staffRoute.post('/',auth,postController)   
staffRoute.put('/:id',auth,putController)
staffRoute.delete('/:id',auth,deleteController)
staffRoute.get('/:id',getOneController)