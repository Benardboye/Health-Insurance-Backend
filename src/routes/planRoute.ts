import express, { Request, Response } from 'express';
import { CreatePlan, GetPlans, GetPlan } from '../controller/planController';
import {auth} from "../middleware/auth"

const router = express.Router();

router.post('/create', CreatePlan);
router.get('/get', GetPlans);
router.get('/get-plan/:id',  GetPlan);


export default router;
