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
exports.LoginUser = exports.CreateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
const utility_1 = require("../utils/utility");
/**======================================================  CREATE   USER   =================================================================**/
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        if (!req.body) {
            return res.status(400).json({
                Error: 'Please fill the fields',
            });
        }
        const CheckUser = yield userModel_1.default.findOne({ email });
        if (CheckUser) {
            return res.status(400).json({ Error: 'User already exist' });
        }
        const user = yield userModel_1.default.create({
            name,
            email,
            phone,
            password: bcryptjs_1.default.hashSync(password),
        });
        const createdUser = yield userModel_1.default.findOne({ email });
        if (createdUser) {
            let signature = yield (0, utility_1.GenerateSignature)({
                _id: createdUser._id,
                email: createdUser.email,
            });
            return res.status(200).json({
                Message: 'Registration successfull',
                user,
                signature,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/user/create',
        });
    }
});
exports.CreateUser = CreateUser;
// /**======================================================  USER LOGIN   =================================================================**/
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!req.body) {
            return res.status(400).json({
                Error: 'Please fill the fields',
            });
        }
        const CheckUser = yield userModel_1.default.findOne({ email });
        if (!CheckUser) {
            return res
                .status(400)
                .json({ Error: 'User does not exit, please sign up' });
        }
        const isMatch = bcryptjs_1.default.compareSync(password, CheckUser.password);
        if (isMatch) {
            let signature = yield (0, utility_1.GenerateSignature)({
                _id: CheckUser._id,
                email: CheckUser.email,
            });
            let username = CheckUser.name;
            return res.status(200).json({
                Message: 'Login Successful',
                username,
                signature,
            });
        }
        return res.status(400).json({
            Error: 'Incorrect password',
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: 'Internal server error',
            Route: '/user/login',
        });
    }
});
exports.LoginUser = LoginUser;
