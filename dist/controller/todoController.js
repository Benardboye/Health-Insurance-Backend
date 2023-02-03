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
exports.DeleteTodo = exports.UpdateTodo = exports.GetTodo = exports.CreateTodo = void 0;
const todoModel_1 = __importDefault(require("../model/todoModel"));
/**======================================================  CREATE TODO   =================================================================**/
const CreateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, status } = req.body;
        if (!req.body) {
            return res.status(400).json({
                Error: "Please fill the fields",
            });
        }
        const todo = yield todoModel_1.default.create({
            description,
            status,
        });
        return res.status(200).json({
            Message: "You have successfully created Todo",
            todo,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "Internal server error",
            Route: "/todo/create",
        });
    }
});
exports.CreateTodo = CreateTodo;
/**======================================================  GET TODO   =================================================================**/
const GetTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const getTodo = yield todoModel_1.default.find({ id });
        return res.status(200).json({
            Message: "Here's your todo",
            getTodo,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "Internal server error",
            Route: "/todo/get",
        });
    }
});
exports.GetTodo = GetTodo;
/**======================================================  UPDATE TODO   =================================================================**/
const UpdateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { description, status } = req.body;
        // const todo = await Todo.find({id})
        // if(!todo) {
        //     return res.status(400).json({
        //         Error: "Todo does not exist",
        //       });
        // }
        const updateTodo = yield todoModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true
        });
        return res.status(200).json({
            Message: "You have succesfully updated your todo",
            updateTodo,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "Internal server error",
            Route: "/todo/update",
        });
    }
});
exports.UpdateTodo = UpdateTodo;
/**======================================================  DELETE TODO   =================================================================**/
const DeleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleteTodo = yield todoModel_1.default.findOneAndDelete({ id });
        return res.status(200).json({
            Message: "You have succesfully updated your todo",
            deleteTodo,
        });
    }
    catch (err) {
        return res.status(500).json({
            Error: "Internal server error",
            Route: "/todo/delete",
        });
    }
});
exports.DeleteTodo = DeleteTodo;
