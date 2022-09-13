"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const validateSchemaMiddleware_1 = __importDefault(require("../middlewares/validateSchemaMiddleware"));
const User_1 = __importDefault(require("../schemas/User"));
const router = (0, express_1.Router)();
router.post('/signup', (0, validateSchemaMiddleware_1.default)(User_1.default), authControllers_1.signUp);
router.post('/login', authControllers_1.login);
exports.default = router;
