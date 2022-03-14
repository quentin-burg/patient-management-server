import { Consultation } from './consultation';

export type MedicalFile = {
  patientId: string;
  professionalId: string;
  consultations: Consultation[];
  parity: number;
  gravidity: number;
};

export const buildMedicalFile = (
  patientId: string,
  professionalId: string,
  consultations: Consultation[],
  parity: number,
  gravidity: number,
): MedicalFile => ({
  parity,
  patientId,
  professionalId,
  consultations,
  gravidity,
});
