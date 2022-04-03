"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_hash_1 = require("../../infra/password-hash");
exports.default = ({ user }) => ({
    findAll: () => user.findAll(),
    getByEmail: (email) => user.findOneByEmail(email),
    getById: (id) => user.findOneById(id),
    register: (args) => user.create(args),
    login: (email, password) => {
        return user
            .findOneByEmail(email)
            .then(user => (0, password_hash_1.comparePassword)(password, user.hash).then(isCorrect => (isCorrect ? user : Promise.reject('Login failed.'))));
    },
    isPatient: (id) => user.findOneById(id).then(u => u.isPatient),
    isProfessional: (id) => user.findOneById(id).then(u => u.isProfessional),
});
