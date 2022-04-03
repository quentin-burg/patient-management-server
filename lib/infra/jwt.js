"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromJWT = exports.isAuthenticated = exports.verifyJWT = exports.makeJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = 'pregnancyWheel';
const makeJWT = (userId, isPatient, isProfessional) => {
    return (0, jsonwebtoken_1.sign)({ userId, isPatient, isProfessional }, JWT_SECRET, { expiresIn: '30d' });
};
exports.makeJWT = makeJWT;
const verifyJWT = (token) => {
    if (!token) {
        console.error('Token not provided. Cannot verify');
        return null;
    }
    try {
        const { userId, isProfessional, isPatient } = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        return { userId, isProfessional, isPatient };
    }
    catch (err) {
        console.error('Error when verify JWT', err);
        return null;
    }
};
exports.verifyJWT = verifyJWT;
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    const userId = (0, exports.verifyJWT)(token)?.userId;
    if (!userId)
        return next('Unauthorized');
    return next();
};
exports.isAuthenticated = isAuthenticated;
const getUserIdFromJWT = (token) => {
    return (0, exports.verifyJWT)(token)?.userId;
};
exports.getUserIdFromJWT = getUserIdFromJWT;
