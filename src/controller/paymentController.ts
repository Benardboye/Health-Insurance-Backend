import {Request, Response} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"

export const MakePayment = (req:JwtPayload, res:Response) => {
    try{
        const id = req.user.id;
    } 
    catch (err) {
        return res.status(500).json({
          Error: 'Internal server error',
          Route: '/payment/create',
        });
      }
}