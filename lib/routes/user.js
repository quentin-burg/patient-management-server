"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt_1 = require("../infra/jwt");
const password_hash_1 = require("../infra/password-hash");
const user_1 = require("../domain/services/user");
exports.default = (repository) => {
    const { register, findAll, login, getById } = (0, user_1.default)(repository);
    const apiRoutes = express.Router();
    apiRoutes.get('/', (req, res, next) => {
        return findAll()
            .then(users => res.status(200).json({ users }))
            .catch(next);
    });
    apiRoutes.get('/:id', (req, res, next) => {
        const { id } = req.params;
        return getById(id)
            .then(user => {
            if (!user)
                return res.status(400).json({ reason: 'Cannot find user' });
            return res.status(200).json({ user });
        })
            .catch(next);
    });
    apiRoutes.post('/register', (req, res, next) => {
        const { firstname, lastname, email, password, isPatient, isProfessional } = req.body;
        if (!firstname || !lastname || !email || !password)
            return res.status(400).json({ reason: 'Missing parameter' });
        if (!isPatient && !isProfessional)
            return res.status(400).json({ reason: 'Need provide isPatient or isProfessional parameter.' });
        return (0, password_hash_1.hashPassword)(password).then(hash => register({ firstname, lastname, email, hash, isPatient, isProfessional })
            .then(user => ({ token: (0, jwt_1.makeJWT)(user.id, user.isPatient, user.isProfessional), user }))
            .then(({ user, token }) => res.status(201).json({ user: user, token }))
            .catch(err => {
            console.error(err);
            return next();
        }));
    });
    apiRoutes.post('/login', (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ reason: 'Missing parameter' });
        return login(email, password)
            .then(user => ({ token: (0, jwt_1.makeJWT)(user.id, user.isPatient, user.isProfessional), user }))
            .then(({ user, token }) => res.status(200).json({ user, token }))
            .catch(next);
    });
    apiRoutes.use(jwt_1.isAuthenticated);
    return apiRoutes;
};
