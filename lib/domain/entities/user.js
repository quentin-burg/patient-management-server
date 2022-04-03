"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalsUserInfos = void 0;
const equalsUserInfos = (u1, u2) => {
    return (u1.firstname === u2.firstname &&
        u1.email === u2.email &&
        u1.lastname === u2.lastname &&
        u1.hash === u2.hash &&
        u1.isPatient === u2.isPatient &&
        u1.isProfessional === u2.isProfessional);
};
exports.equalsUserInfos = equalsUserInfos;
