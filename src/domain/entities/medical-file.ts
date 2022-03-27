import { Consultation } from './consultation';

export type MedicalFile = {
  id: string;
  patientId: string;
  professionalId: string;
  parity: number;
  gravidity: number;
  consultations: Consultation[];
};
