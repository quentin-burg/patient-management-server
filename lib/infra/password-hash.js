"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const saltRound = 10;
const hashPassword = (password) => (0, bcrypt_1.hash)(password, saltRound);
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => (0, bcrypt_1.compare)(password, hash);
exports.comparePassword = comparePassword;
