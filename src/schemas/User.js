"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UserSchema = joi_1.default.object({
    email: joi_1.default.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: joi_1.default.string().min(10),
});
exports.default = UserSchema;
