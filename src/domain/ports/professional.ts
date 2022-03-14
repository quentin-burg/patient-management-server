import { Professional } from '../entities/identity/professional';

export interface ProfessionalPort {
  findAll(): Promise<Professional[]>;
}
