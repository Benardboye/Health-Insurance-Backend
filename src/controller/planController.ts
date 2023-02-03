import { Request, Response } from 'express';
import Plan from '../model/planModel';

//************ CREATE PLAN ************/
export const CreatePlan = async (req: Request, res: Response) => {
  try {
    const { plan_type, number_of_members, planPrice, packages } = req.body;

    if (!req.body) {
      return res.status(400).json({
        Error: 'Please fill the fields',
      });
    }

    const plan = await Plan.create({
      plan_type,
      number_of_members,
      planPrice,
      packages,
    });

    return res.status(200).json({
      Message: 'Plan succesfully created',
      plan,
    });
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal server error',
      Route: '/plan/create',
    });
  }
};

//************ GET ALL PLAN S************/
export const GetPlans = async (req: Request, res: Response) => {
  try {
    const getPlans = await Plan.find({});
    return res.status(200).json({
      getPlans,
    });
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal server error',
      Route: '/plan/get',
    });
  }
};

//************ GET SINGLE PLAN************/
export const GetPlan = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const getPlan = await Plan.findOne({ _id:id });
    return res.status(200).json({
      getPlan,
    });
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal server error',
      Route: '/plan/get-plan',
    });
  }
};
