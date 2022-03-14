import { RegisterParams } from '../../shared.types';
import { Professional } from '../entities/identity/professional';
import { ProfessionalPort } from '../ports/professional';

interface ProfessionalUseCases {
  // register(args: RegisterParams): Professional;
  findAllProfessionals(): Promise<Professional[]>;
}

export default (repo: ProfessionalPort): ProfessionalUseCases => ({
  // register: args => {},
  findAllProfessionals: () => repo.findAll(),
});
