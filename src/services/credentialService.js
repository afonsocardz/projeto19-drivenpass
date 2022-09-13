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
exports.createCredential = exports.getCredentialById = exports.getCredentialsByUserId = exports.deleteCredential = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
const SECRET = process.env.SECRET || 'banana';
const cryptr = new cryptr_1.default(SECRET);
function deleteCredential(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isCredentialExists(id, userId);
        yield deleteCredentialById(id);
    });
}
exports.deleteCredential = deleteCredential;
function deleteCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield credentialRepository.deleteCredentialById(id);
    });
}
function getCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield credentialRepository.getCredentialsByUserId(userId);
        credentials.map(credential => decryptCredential(credential));
        return credentials;
    });
}
exports.getCredentialsByUserId = getCredentialsByUserId;
function getCredentialById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield isCredentialExists(id, userId);
        decryptCredential(credential);
        return credential;
    });
}
exports.getCredentialById = getCredentialById;
function decryptCredential(credentialData) {
    credentialData.password = cryptr.decrypt(credentialData.password);
}
function isCredentialExists(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.getCredentialById(id, userId);
        if (!credential) {
            throw { type: "notFound", message: "Credential doesn't exists or it can't be accessed" };
        }
        return credential;
    });
}
function createCredential(credential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isCredentialNameExists(credential, userId);
        encryptPassword(credential);
        yield credentialRepository.createCredential(credential, userId);
    });
}
exports.createCredential = createCredential;
function isCredentialNameExists(credentialData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.getCredentialByTitle(credentialData, id);
        if (credential) {
            throw { type: 'conflict' };
        }
    });
}
function encryptPassword(credential) {
    credential.password = cryptr.encrypt(credential.password);
}
