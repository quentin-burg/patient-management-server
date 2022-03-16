import { comparePassword } from '../../infra/password-hash';
import { PatientRegisterParams } from '../../shared.types';
import { Repository } from '../ports';

export default ({ patient }: Repository) => ({
  findAll: () => patient.findAll(),
  register: (args: PatientRegisterParams) => patient.create(args),
  login: (email: string, password: string) => {
    return patient
      .findOneByEmail(email)
      .then(p =>
        comparePassword(password, p.hash).then(isCorrect => (isCorrect ? p : Promise.reject('Login failed.'))),
      );
  },
});
