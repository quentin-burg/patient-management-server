import { comparePassword } from '../../infra/password-hash';
import { UserRegisterParams } from '../../shared.types';
import { Repository } from '../ports';

export default ({ user }: Repository) => ({
  findAll: () => user.findAll(),
  register: (args: UserRegisterParams) => user.create(args),
  login: (email: string, password: string) => {
    return user
      .findOneByEmail(email)
      .then(user =>
        comparePassword(password, user.hash).then(isCorrect => (isCorrect ? user : Promise.reject('Login failed.'))),
      );
  },
});
