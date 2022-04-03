import { ConsultationCreateParams, ConsultationUpdateParams } from '../../shared.types';
import { Consultation } from '../entities/consultation';

export interface ConsultationPort {
  findAll(): Promise<Consultation[]>;
  create(args: ConsultationCreateParams): Promise<Consultation>;
  findOneById(id: string): Promise<Consultation>;
  update(args: ConsultationUpdateParams): Promise<Consultation>;
  findAllByMedicalFileId(id: string): Promise<Consultation[]>;
}
