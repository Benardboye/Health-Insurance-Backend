import mongoose, { Schema } from "mongoose";

export interface PlanAttributes {
    _id: string;
    plan_type: string;
    number_of_members: number;
    planPrice: string;
    packages: string[]
}

const PlanSchema = new Schema({
    plan_type: {
        type:String,
        required: true
    },
    number_of_members: {
        type:Number,
        required: true
    },
    planPrice: {
        type:String,
        required: true
    },
    packages: [{
        type:String,
        required: true
    }],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, {
    timestamps:true 
 }
)

const Plan = mongoose.model<PlanAttributes>("Plan", PlanSchema)

export default Plan