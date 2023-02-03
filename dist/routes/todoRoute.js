"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.post('/create', todoController_1.CreateTodo);
router.get('/get/:id', todoController_1.GetTodo);
router.patch('/update/:id', todoController_1.UpdateTodo);
router.delete('/delete/:id', todoController_1.DeleteTodo);
exports.default = router;
