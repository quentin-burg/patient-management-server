// import { MedicalFile } from '../consultation/medical-file';

export type Patient = {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string; // Date ?
  // medicalFiles: MedicalFile[];
};

export const buildPatient = (
  firstname: string,
  lastname: string,
  email: string,
  birthdate: string,
  // medicalFiles: MedicalFile[],
): Patient => ({
  firstname,
  lastname,
  email,
  birthdate,
  // medicalFiles,
});
