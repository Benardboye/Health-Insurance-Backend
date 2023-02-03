import { UserPayload } from "../interface/User.dto";
import jwt, {JwtPayload} from "jsonwebtoken"

export const AppSecret = "smartchainassessmentolorunagabye"

export const GenerateSignature = async (payload: UserPayload) => {
    return  jwt.sign(payload, AppSecret, { expiresIn: "1d" }); 
  };

  export const VerifySignature = async (signature : string) => {
    return  jwt.verify(signature, AppSecret) as JwtPayload; 
  };