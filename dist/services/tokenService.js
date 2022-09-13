"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';
function signToken({ id }) {
    return {
        token: jsonwebtoken_1.default.sign({ id }, TOKEN_SECRET)
    };
}
exports.signToken = signToken;
function verifyToken(token) {
    if (!token) {
        throw { type: 'notAuthorized' };
    }
    return jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
}
exports.verifyToken = verifyToken;
