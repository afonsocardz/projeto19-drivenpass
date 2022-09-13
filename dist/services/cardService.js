"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = exports.getCardById = exports.getCardsByUserId = exports.deleteCard = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cardRepository = __importStar(require("../repositories/cardRepository"));
const SECRET = process.env.SECRET || 'banana';
const cryptr = new cryptr_1.default(SECRET);
function deleteCard(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isCardExists(id, userId);
        yield deleteCardById(id);
    });
}
exports.deleteCard = deleteCard;
function deleteCardById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield cardRepository.deleteCardById(id);
    });
}
function getCardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield cardRepository.getCardsByUserId(userId);
        cards.map(card => decryptCard(card));
        return cards;
    });
}
exports.getCardsByUserId = getCardsByUserId;
function getCardById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield isCardExists(id, userId);
        decryptCard(card);
        return card;
    });
}
exports.getCardById = getCardById;
function decryptCard(cardData) {
    cardData.password = cryptr.decrypt(cardData.password);
}
function isCardExists(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.getCardById(id, userId);
        if (!card) {
            throw { type: "notFound", message: "Card doesn't exists or it can't be accessed" };
        }
        return card;
    });
}
function createCard(card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isCardNameExists(card, userId);
        encryptPassword(card);
        yield cardRepository.createCard(card, userId);
    });
}
exports.createCard = createCard;
function isCardNameExists(cardData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.getCardByTitle(cardData, id);
        if (card) {
            throw { type: 'conflict' };
        }
    });
}
function encryptPassword(card) {
    card.password = cryptr.encrypt(card.password);
}
