import { Repository } from '../../domain/ports';
import { UserAdapter } from './user';
import { MedicalFileAdapter } from './medical-file';
import { ConsultationAdapter } from './consultation';

export const repository: Repository = {
  user: UserAdapter,
  medicalFile: MedicalFileAdapter,
  consultation: ConsultationAdapter,
};
