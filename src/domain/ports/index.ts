import { ConsultationPort } from './consultation';
import { MedicalFilesPort } from './medical-files';
import { UserPort } from './user';

export interface Repository {
  user: UserPort;
  medicalFiles: MedicalFilesPort;
  consultation: ConsultationPort;
}
