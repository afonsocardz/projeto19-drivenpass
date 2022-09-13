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
exports.deleteNetworkById = exports.getNetworksByUserId = exports.getNetworkById = exports.createNetwork = void 0;
const database_1 = require("../config/database");
function createNetwork(network, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.network.create({
            data: Object.assign(Object.assign({}, network), { userId })
        });
    });
}
exports.createNetwork = createNetwork;
function getNetworkById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.network.findFirst({ where: { id, userId } });
    });
}
exports.getNetworkById = getNetworkById;
function getNetworksByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.prisma.network.findMany({ where: { userId } });
    });
}
exports.getNetworksByUserId = getNetworksByUserId;
function deleteNetworkById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.network.delete({ where: { id } });
    });
}
exports.deleteNetworkById = deleteNetworkById;
