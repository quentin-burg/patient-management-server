"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyProfessional = void 0;
const jwt_1 = require("../jwt");
const onlyProfessional = (isProfessionalService) => (req, res, next) => {
    const userId = (0, jwt_1.getUserIdFromJWT)(req.headers.authorization);
    if (!userId)
        return res.status(400).json({ reason: 'Invalid token provided. User not found.' });
    req.userId = userId;
    return isProfessionalService(userId)
        .then(isPro => {
        if (isPro)
            return next();
        return res.status(403).json({ reason: 'You are not a professional.' });
    })
        .catch(err => {
        console.error(err);
        return next();
    });
};
exports.onlyProfessional = onlyProfessional;
