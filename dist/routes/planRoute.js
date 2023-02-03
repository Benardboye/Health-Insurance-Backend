"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planController_1 = require("../controller/planController");
const router = express_1.default.Router();
router.post('/create', planController_1.CreatePlan);
router.get('/get', planController_1.GetPlans);
router.get('/get-plan/:id', planController_1.GetPlan);
exports.default = router;
