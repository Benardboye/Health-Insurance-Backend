"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlan = exports.GetPlans = exports.CreatePlan = void 0;
const planModel_1 = __importDefault(require("../model/planModel"));
//************ CREATE PLAN ************/
const CreatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plan_type, number_of_members, planPrice, packages } = req.body;
        if (!req.body) {
            return res.status(400).json({
                Error: 'Please fill the fields',
            });
        }
        const plan = yield planModel_1.default.create({
            plan_type,
            number_of_members,
            planPrice,
            packages,
        });
        return res.status(200).json({
            Message: 'Plan succesfully created',
            plan,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/plan/create',
        });
    }
});
exports.CreatePlan = CreatePlan;
//************ GET ALL PLAN S************/
const GetPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPlans = yield planModel_1.default.find({});
        return res.status(200).json({
            getPlans,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/plan/get',
        });
    }
});
exports.GetPlans = GetPlans;
//************ GET SINGLE PLAN************/
const GetPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const getPlan = yield planModel_1.default.findOne({ _id: id });
        return res.status(200).json({
            getPlan,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/plan/get-plan',
        });
    }
});
exports.GetPlan = GetPlan;
