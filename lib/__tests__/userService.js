"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../domain/entities/user");
const testing_1 = require("../infra/testing");
const user_2 = require("../domain/services/user");
const password = 'password';
const hash = '$2b$10$u/E0p6CzfWYvDVwEwqk0x.GHS9/vhakgBrxjR1wa0eoAp8iEbXLge';
const userParams = {
    email: 'qb@gmail.com',
    firstname: 'quentin',
    lastname: 'burg',
    hash,
    isPatient: true,
    isProfessional: false,
};
const userService = (0, user_2.default)(testing_1.repository);
describe('user service tests', () => {
    it('should return a user with same infos when we register', () => {
        expect.assertions(1);
        userService.register(userParams).then(u => {
            expect((0, user_1.equalsUserInfos)(u, { ...userParams, id: 'fake' })).toBe(true);
        });
    });
    // it('should return a user with same email and hash when login', () => {
    //   expect.assertions(1);
    //   userService
    //     .register(userParams)
    //     .then(user => {
    //       return userService
    //         .login(user.email, password)
    //         .then(u => {
    //           expect(equalsUserInfos(u, { ...userParams, id: 'fake' })).toBe(true);
    //         })
    //         .catch(console.error);
    //     })
    //     .catch(console.error);
    // });
    it('register patient and expect user returned to be a patient', () => {
        expect.assertions(1);
        userService
            .register({ ...userParams, isPatient: true, isProfessional: false })
            .then(u => userService.isPatient(u.id).then(isPatient => expect(isPatient).toBe(true)));
    });
    it('register professional and expect user returned to be a professional', () => {
        expect.assertions(1);
        userService
            .register({ ...userParams, isPatient: false, isProfessional: true })
            .then(u => userService.isProfessional(u.id).then(isPro => expect(isPro).toBe(true)));
    });
});
