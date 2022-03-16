import { ProfessionalRegisterParams } from '../../shared.types';
import { Professional } from '../entities/identity/professional';

export interface ProfessionalPort {
  findAll(): Promise<Professional[]>;
  create(args: ProfessionalRegisterParams): Promise<Professional>;
  findOneByEmail(email: string): Promise<Professional>;
}
