"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouters_1 = __importDefault(require("./authRouters"));
const cardRouters_1 = __importDefault(require("./cardRouters"));
const credentialRouters_1 = __importDefault(require("./credentialRouters"));
const networkRouters_1 = __importDefault(require("./networkRouters"));
const noteRouters_1 = __importDefault(require("./noteRouters"));
const router = (0, express_1.Router)();
router.use(authRouters_1.default);
router.use('/credentials', credentialRouters_1.default);
router.use('/cards', cardRouters_1.default);
router.use('/notes', noteRouters_1.default);
router.use('/networks', networkRouters_1.default);
exports.default = router;
