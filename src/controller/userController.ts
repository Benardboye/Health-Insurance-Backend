import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/userModel';
import { GenerateSignature } from '../utils/utility';
import { UserPayload } from '../interface/User.dto';

/**======================================================  CREATE   USER   =================================================================**/

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!req.body) {
      return res.status(400).json({
        Error: 'Please fill the fields',
      });
    }

    const CheckUser = await User.findOne({ email });

    if (CheckUser) {
      return res.status(400).json({ Error: 'User already exist' });
    }
    const user = await User.create({
      
      name,
      email,
      phone,
      password: bcrypt.hashSync(password),
    });

    const createdUser = await User.findOne({ email });

    if (createdUser) {
      let signature = await GenerateSignature({
        _id: createdUser._id,
        email: createdUser.email,
      });
      return res.status(200).json({
        Message: 'Registration successfull',
        user,
        signature,
      });
    }
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal server error',
      Route: '/user/create',
    });
  }
};

// /**======================================================  USER LOGIN   =================================================================**/

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!req.body) {
      return res.status(400).json({
        Error: 'Please fill the fields',
      });
    }

    const CheckUser = await User.findOne({ email });

    if (!CheckUser) {
      return res
        .status(400)
        .json({ Error: 'User does not exit, please sign up' });
    }
    const isMatch = bcrypt.compareSync(password, CheckUser.password);

    if (isMatch) {
      let signature = await GenerateSignature({
        _id: CheckUser._id,
        email: CheckUser.email,
      });
      let username = CheckUser.name
      return res.status(200).json({
        Message: 'Login Successful',
        username,
        signature,
      });
    }
    return res.status(400).json({
      Error: 'Incorrect password',
    });
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal server error',
      Route: '/user/login',
    });
  }
};

