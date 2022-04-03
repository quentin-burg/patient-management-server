"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntity = void 0;
const sequelize_1 = require("sequelize");
const toEntity = (u) => ({
    id: u.id,
    email: u.email,
    lastname: u.lastname,
    firstname: u.firstname,
    hash: u.hash,
    isPatient: u.isPatient,
    isProfessional: u.isProfessional,
});
exports.toEntity = toEntity;
exports.default = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
        },
        firstname: sequelize_1.DataTypes.STRING,
        lastname: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        hash: sequelize_1.DataTypes.STRING,
        isProfessional: sequelize_1.DataTypes.BOOLEAN,
        isPatient: sequelize_1.DataTypes.BOOLEAN,
    });
    const UserAdapter = {
        findAll: () => User.findAll().then(users => users.map(exports.toEntity)),
        create: (args) => User.create(args),
        findOneByEmail: (email) => User.findOne({ where: { email } }).then(u => (u ? (0, exports.toEntity)(u) : Promise.reject('User not found.'))),
        findOneById: (id) => User.findOne({ where: { id } }).then(u => (u ? (0, exports.toEntity)(u) : Promise.reject('User not found.'))),
    };
    return { User, UserAdapter };
};
