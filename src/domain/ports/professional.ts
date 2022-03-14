import { RegisterParams } from '../../shared.types';
import { Professional } from '../entities/identity/professional';

export interface ProfessionalPort {
  findAll(): Promise<Professional[]>;
  create(args: RegisterParams): Promise<Professional>;
}
