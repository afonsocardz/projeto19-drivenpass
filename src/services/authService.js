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
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRepository = __importStar(require("../repositories/authRepository"));
const tokenService_1 = require("./tokenService");
function signUp(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isUserExists(userData);
        encyptPassword(userData);
        yield authRepository.create(userData);
    });
}
exports.signUp = signUp;
function login(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield validatePassword(userData);
        return (0, tokenService_1.signToken)(user);
    });
}
exports.login = login;
function validatePassword(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.getUserByEmail(userData);
        const isValid = bcrypt_1.default.compareSync(userData.password, user.password);
        if (!isValid) {
            throw { type: 'notAuthorized' };
        }
        return user;
    });
}
function isUserExists(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.getUserByEmail(userData);
        if (user) {
            throw { type: 'conflict', message: 'E-mail is been used by another user already' };
        }
    });
}
function encyptPassword(user) {
    const SALTS = 10;
    user.password = bcrypt_1.default.hashSync(user.password, SALTS);
}
