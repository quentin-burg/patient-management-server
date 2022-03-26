import { Consultation } from '../entities/consultation/consultation';

export interface ConsultationPort {
  findAll(): Promise<Consultation[]>; // TODO
}
