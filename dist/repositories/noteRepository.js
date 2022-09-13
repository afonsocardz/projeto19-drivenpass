"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteById = exports.getNotesByUserId = exports.getNoteById = exports.createNote = exports.getNoteByTitle = void 0;
const database_1 = require("../config/database");
function getNoteByTitle(note, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.note.findFirst({ where: { title: note.title, userId } });
    });
}
exports.getNoteByTitle = getNoteByTitle;
function createNote(note, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.note.create({
            data: Object.assign(Object.assign({}, note), { userId })
        });
    });
}
exports.createNote = createNote;
function getNoteById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.note.findFirst({ where: { id, userId } });
    });
}
exports.getNoteById = getNoteById;
function getNotesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.note.findMany({ where: { userId } });
    });
}
exports.getNotesByUserId = getNotesByUserId;
function deleteNoteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.note.delete({ where: { id } });
    });
}
exports.deleteNoteById = deleteNoteById;
