"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteControllers_1 = require("../controllers/noteControllers");
const validateSchemaMiddleware_1 = __importDefault(require("../middlewares/validateSchemaMiddleware"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const Note_1 = require("../schemas/Note");
const router = (0, express_1.Router)();
router.post('/', validateTokenMiddleware_1.validateToken, (0, validateSchemaMiddleware_1.default)(Note_1.NoteSchema), noteControllers_1.createNote);
router.get('/:id', validateTokenMiddleware_1.validateToken, noteControllers_1.getNoteById);
router.get('/', validateTokenMiddleware_1.validateToken, noteControllers_1.getNotesByUserId);
router.delete('/:id', validateTokenMiddleware_1.validateToken, noteControllers_1.deleteNote);
exports.default = router;
