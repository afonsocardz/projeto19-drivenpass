"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardsControllers_1 = require("../controllers/cardsControllers");
const validateSchemaMiddleware_1 = __importDefault(require("../middlewares/validateSchemaMiddleware"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const Card_1 = require("../schemas/Card");
const router = (0, express_1.Router)();
router.post('/', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.default)(Card_1.CardSchema), cardsControllers_1.createCard);
router.get('/:id', validateTokenMiddleware_1.validateToken, cardsControllers_1.getCardById);
router.get('/', validateTokenMiddleware_1.validateToken, cardsControllers_1.getCardsByUserId);
router.delete('/:id', validateTokenMiddleware_1.validateToken, cardsControllers_1.deleteCard);
exports.default = router;
