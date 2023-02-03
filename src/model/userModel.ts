import mongoose, { Schema } from "mongoose";

export interface UserAttribute {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  paymentStatus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  plan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }]

}, {
   timestamps:true 
});


const User = mongoose.model<UserAttribute>("User", UserSchema)

export default User