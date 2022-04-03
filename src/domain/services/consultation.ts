import { ConsultationCreateParams, ConsultationUpdateParams } from '../../shared.types';
import { Repository } from '../ports';

export default ({ consultation }: Repository) => ({
  findAll: () => consultation.findAll(),
  create: (args: ConsultationCreateParams) => consultation.create(args),
  update: (args: ConsultationUpdateParams) => consultation.update(args),
  findAllByMedicalFileId: (fileId: string) => consultation.findAllByMedicalFileId(fileId),
});
