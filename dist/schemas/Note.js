"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.NoteSchema = joi_1.default.object({
    note: joi_1.default.string().max(1000),
    title: joi_1.default.string().max(50)
});
