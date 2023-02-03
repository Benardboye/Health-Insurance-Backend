import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppSecret } from "../utils/utility";
import User from "../model/userModel";


export const auth = async (req: JwtPayload, res: Response, next: NextFunction) => {
  try {
      const authorization = req.headers.authorization; 
      console.log('re headers',req.headers)
      
      if (!authorization) {
          return res.status(401).json({
              Error: "Kindly login",
            });
        }
        console.log('locate me')
    const token = authorization.slice(7, authorization.length);
    const validate = await jwt.verify(token, AppSecret);
    console.log('human being',token)

    if (!validate) {
      return res.status(401).json({
        Error: "Unauthorised",
      });
    }
    const {_id} = validate as { [key: string]: string }; 

    //FIND USER BY ID
    const user = await User.findOne({_id});

    if (!user) {
      return res.status(200).json({
        Error: "Invalid Credentials",
      });
    }
    req.user = validate;
    next();
  } catch (err) {
    return res.status(401).json({
      Error: "Unauthorised",
    });
  }
};