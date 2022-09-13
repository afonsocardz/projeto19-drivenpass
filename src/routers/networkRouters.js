"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const networkControllers_1 = require("../controllers/networkControllers");
const validateSchemaMiddleware_1 = __importDefault(require("../middlewares/validateSchemaMiddleware"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const Network_1 = require("../schemas/Network");
const router = (0, express_1.Router)();
router.post('/', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.default)(Network_1.NetworkSchema), networkControllers_1.createNetwork);
router.get('/:id', validateTokenMiddleware_1.validateToken, networkControllers_1.getNetworkById);
router.get('/', validateTokenMiddleware_1.validateToken, networkControllers_1.getNetworksByUserId);
router.delete('/:id', validateTokenMiddleware_1.validateToken, networkControllers_1.deleteNetwork);
exports.default = router;
