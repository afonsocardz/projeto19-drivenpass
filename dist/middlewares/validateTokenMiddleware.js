"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const tokenService_1 = require("../services/tokenService");
function validateToken(req, res, next) {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    res.locals.id = (0, tokenService_1.verifyToken)(token);
    next();
}
exports.validateToken = validateToken;
