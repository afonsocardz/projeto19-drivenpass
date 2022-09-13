"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialControllers_1 = require("../controllers/credentialControllers");
const validateSchemaMiddleware_1 = __importDefault(require("../middlewares/validateSchemaMiddleware"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const Credential_1 = require("../schemas/Credential");
const router = (0, express_1.Router)();
router.post('/', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.default)(Credential_1.CredentialSchema), credentialControllers_1.createCredential);
router.get('/:id', validateTokenMiddleware_1.validateToken, credentialControllers_1.getCredentialById);
router.get('/', validateTokenMiddleware_1.validateToken, credentialControllers_1.getCredentialsByUserId);
router.delete('/:id', validateTokenMiddleware_1.validateToken, credentialControllers_1.deleteCredential);
exports.default = router;
