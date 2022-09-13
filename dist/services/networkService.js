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
exports.createNetwork = exports.getNetworkById = exports.getNetworksByUserId = exports.deleteNetwork = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const networkRepository = __importStar(require("../repositories/networkRepository"));
const SECRET = process.env.SECRET || 'banana';
const cryptr = new cryptr_1.default(SECRET);
function deleteNetwork(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isNetworkExists(id, userId);
        yield deleteNetworkById(id);
    });
}
exports.deleteNetwork = deleteNetwork;
function deleteNetworkById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield networkRepository.deleteNetworkById(id);
    });
}
function getNetworksByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const networks = yield networkRepository.getNetworksByUserId(userId);
        networks.map(network => decryptNetwork(network));
        return networks;
    });
}
exports.getNetworksByUserId = getNetworksByUserId;
function getNetworkById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const network = yield isNetworkExists(id, userId);
        decryptNetwork(network);
        return network;
    });
}
exports.getNetworkById = getNetworkById;
function decryptNetwork(networkData) {
    networkData.password = cryptr.decrypt(networkData.password);
}
function isNetworkExists(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const network = yield networkRepository.getNetworkById(id, userId);
        if (!network) {
            throw { type: "notFound", message: "Network doesn't exists or it can't be accessed" };
        }
        return network;
    });
}
function createNetwork(network, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        encryptPassword(network);
        yield networkRepository.createNetwork(network, userId);
    });
}
exports.createNetwork = createNetwork;
function encryptPassword(network) {
    network.password = cryptr.encrypt(network.password);
}
