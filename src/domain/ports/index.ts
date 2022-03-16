import { PatientPort } from './patient';
import { ProfessionalPort } from './professional';

export interface Repository {
  professional: ProfessionalPort;
  patient: PatientPort;
}
