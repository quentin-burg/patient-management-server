"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const user_1 = require("./user");
const medical_file_1 = require("./medical-file");
const consultation_1 = require("./consultation");
exports.repository = {
    user: user_1.UserAdapter,
    medicalFile: medical_file_1.MedicalFileAdapter,
    consultation: consultation_1.ConsultationAdapter,
};
