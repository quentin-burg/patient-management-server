import { comparePassword } from '../../infra/password-hash';
import { PatientRegisterParams } from '../../shared.types';
import { PatientPort } from '../ports/patient';

export default (repository: PatientPort) => ({
  findAll: () => repository.findAll(),
  register: (args: PatientRegisterParams) => repository.create(args),
  login: (email: string, password: string) => {
    return repository
      .findOneByEmail(email)
      .then(p =>
        comparePassword(password, p.hash).then(isCorrect => (isCorrect ? p : Promise.reject('Login failed.'))),
      );
  },
});
