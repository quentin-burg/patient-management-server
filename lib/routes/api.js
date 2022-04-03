"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./user");
const medical_file_1 = require("./medical-file");
const consultation_1 = require("./consultation");
exports.default = (repository) => {
    const apiRoutes = express.Router();
    apiRoutes.use('/user', (0, user_1.default)(repository));
    apiRoutes.use('/medical-file', (0, medical_file_1.default)(repository));
    apiRoutes.use('/consultation', (0, consultation_1.default)(repository));
    return apiRoutes;
};
