import mongoose, { Schema } from "mongoose";

export interface PaymentAttribute {
  _id: string;
  isSubscribed: boolean
}

const PaymentSchema = new Schema({
    isSubscribed: {
    type: Boolean,
    required: true,
    default: false
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, {
   timestamps:true 
});


const Payment = mongoose.model<PaymentAttribute>("Payment", PaymentSchema)

export default Payment