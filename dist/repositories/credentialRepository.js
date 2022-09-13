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
exports.deleteCredentialById = exports.getCredentialsByUserId = exports.getCredentialById = exports.createCredential = exports.getCredentialByTitle = void 0;
const database_1 = require("../config/database");
function getCredentialByTitle(credential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.credential.findFirst({ where: { title: credential.title, userId } });
    });
}
exports.getCredentialByTitle = getCredentialByTitle;
function createCredential(credential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.credential.create({
            data: Object.assign(Object.assign({}, credential), { userId })
        });
    });
}
exports.createCredential = createCredential;
function getCredentialById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.credential.findFirst({ where: { id, userId } });
    });
}
exports.getCredentialById = getCredentialById;
function getCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.credential.findMany({ where: { userId } });
    });
}
exports.getCredentialsByUserId = getCredentialsByUserId;
function deleteCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.credential.delete({ where: { id } });
    });
}
exports.deleteCredentialById = deleteCredentialById;
