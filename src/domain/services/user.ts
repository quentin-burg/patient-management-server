import { comparePassword } from '../../infra/password-hash';
import { UserRegisterParams } from '../../shared.types';
import { Repository } from '../ports';

export default ({ user }: Repository) => ({
  findAll: () => user.findAll(),
  getByEmail: (email: string) => user.findOneByEmail(email),
  getById: (id: string) => user.findOneById(id),
  register: (args: UserRegisterParams) => user.create(args),
  login: (email: string, password: string) => {
    return user
      .findOneByEmail(email)
      .then(user =>
        comparePassword(password, user.hash).then(isCorrect => (isCorrect ? user : Promise.reject('Login failed.'))),
      );
  },
  isPatient: (id: string) => user.findOneById(id).then(u => u.isPatient),
  isProfessional: (id: string) => user.findOneById(id).then(u => u.isProfessional),
});
