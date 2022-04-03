"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdapter = void 0;
const users = {};
const createUser = ({ email, isPatient, isProfessional, hash, lastname, firstname }) => {
    const id = Math.random + '';
    const user = {
        email,
        isPatient,
        isProfessional,
        hash,
        firstname,
        lastname,
        id,
    };
    users[id] = user;
    return Promise.resolve(user);
};
const findOneByEmail = (email) => {
    const user = Object.values(users).find(u => u.email === email);
    return user ? Promise.resolve(user) : Promise.reject('Cannot find user');
};
const findOneById = id => {
    const user = users[id];
    return user ? Promise.resolve(user) : Promise.reject('Cannot find user');
};
exports.UserAdapter = {
    findAll: () => Promise.resolve(Object.values(users)),
    create: createUser,
    findOneByEmail,
    findOneById,
};
