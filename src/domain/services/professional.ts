import { comparePassword } from '../../infra/password-hash';
import { ProfessionalRegisterParams } from '../../shared.types';
import { ProfessionalPort } from '../ports/professional';

export default (repository: ProfessionalPort) => ({
  findAll: () => repository.findAll(),
  register: (args: ProfessionalRegisterParams) => repository.create(args),
  login: (email: string, password: string) => {
    return repository
      .findOneByEmail(email)
      .then(p =>
        comparePassword(password, p.hash).then(isCorrect => (isCorrect ? p : Promise.reject('Login failed.'))),
      );
  },
});
