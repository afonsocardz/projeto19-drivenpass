"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CardSchema = joi_1.default.object({
    number: joi_1.default.string().required(),
    securityCode: joi_1.default.number().required(),
    cardholderName: joi_1.default.string().required(),
    expirationDate: joi_1.default.date(),
    password: joi_1.default.string().required(),
    isVirtual: joi_1.default.boolean().required(),
    type: joi_1.default.string().equal('CREDIT', 'DEBIT', 'CREDIT_DEBIT'),
    title: joi_1.default.string().required(),
});
