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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNetwork = exports.getNetworksByUserId = exports.getNetworkById = exports.createNetwork = void 0;
const networkService = __importStar(require("../services/networkService"));
function createNetwork(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = res.locals.id;
        const network = req.body;
        yield networkService.createNetwork(network, userId);
        res.sendStatus(201);
    });
}
exports.createNetwork = createNetwork;
function getNetworkById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = res.locals.id;
        const id = Number(req.params.id);
        const network = yield networkService.getNetworkById(id, userId);
        res.status(200).send(network);
    });
}
exports.getNetworkById = getNetworkById;
function getNetworksByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = res.locals.id;
        const networks = yield networkService.getNetworksByUserId(userId);
        res.status(200).send(networks);
    });
}
exports.getNetworksByUserId = getNetworksByUserId;
function deleteNetwork(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = res.locals.id;
        const id = Number(req.params.id);
        yield networkService.deleteNetwork(id, userId);
        res.sendStatus(200);
    });
}
exports.deleteNetwork = deleteNetwork;
