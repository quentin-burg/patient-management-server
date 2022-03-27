import { ConsultationPort } from './consultation';
import { MedicalFilePort } from './medical-file';
import { UserPort } from './user';

export interface Repository {
  user: UserPort;
  medicalFile: MedicalFilePort;
  consultation: ConsultationPort;
}
