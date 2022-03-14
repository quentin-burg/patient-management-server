import { RegisterParams } from '../../shared.types';
import { Professional } from '../entities/identity/professional';
import { ProfessionalPort } from '../ports/professional';

interface ProfessionalUseCases {
  register(args: RegisterParams): Promise<Professional>;
  findAllProfessionals(): Promise<Professional[]>;
}

export default (repo: ProfessionalPort): ProfessionalUseCases => ({
  register: args => repo.create(args),
  findAllProfessionals: () => repo.findAll(),
});
