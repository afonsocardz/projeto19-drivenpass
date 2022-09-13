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
exports.deleteCardById = exports.getCardsByUserId = exports.getCardById = exports.createCard = exports.getCardByTitle = void 0;
const database_1 = require("../config/database");
function getCardByTitle(card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.card.findFirst({ where: { title: card.title, userId } });
    });
}
exports.getCardByTitle = getCardByTitle;
function createCard(card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.card.create({
            data: Object.assign(Object.assign({}, card), { userId })
        });
    });
}
exports.createCard = createCard;
function getCardById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.card.findFirst({ where: { id, userId } });
    });
}
exports.getCardById = getCardById;
function getCardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.card.findMany({ where: { userId } });
    });
}
exports.getCardsByUserId = getCardsByUserId;
function deleteCardById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.card.delete({ where: { id } });
    });
}
exports.deleteCardById = deleteCardById;
