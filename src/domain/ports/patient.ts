import { Patient } from '../entities/identity/patient';

export interface PatientPort {
  findAll(): Promise<Patient[]>;
}
