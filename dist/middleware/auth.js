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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utility_1 = require("../utils/utility");
const userModel_1 = __importDefault(require("../model/userModel"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        console.log('re headers', req.headers);
        if (!authorization) {
            return res.status(401).json({
                Error: "Kindly login",
            });
        }
        console.log('locate me');
        const token = authorization.slice(7, authorization.length);
        const validate = yield jsonwebtoken_1.default.verify(token, utility_1.AppSecret);
        console.log('human being', token);
        if (!validate) {
            return res.status(401).json({
                Error: "Unauthorised",
            });
        }
        const { _id } = validate;
        //FIND USER BY ID
        const user = yield userModel_1.default.findOne({ _id });
        if (!user) {
            return res.status(200).json({
                Error: "Invalid Credentials",
            });
        }
        req.user = validate;
        next();
    }
    catch (err) {
        return res.status(401).json({
            Error: "Unauthorised",
        });
    }
});
exports.auth = auth;
