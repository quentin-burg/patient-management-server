import { PatientRegisterParams } from '../../shared.types';
import { Patient } from '../entities/identity/patient';

export interface PatientPort {
  findAll(): Promise<Patient[]>;
  register(args: PatientRegisterParams): Promise<Patient>;
}
