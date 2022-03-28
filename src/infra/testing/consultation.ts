import { ConsultationCreateParams, ConsultationUpdateParams } from '../../shared.types';
import { Consultation } from '../../domain/entities/consultation';
import { ConsultationPort } from '../../domain/ports/consultation';
import { toTerm } from '../../domain/entities/term';

const consultations: Record<string, Consultation> = {};

const create = ({ term, medicalFileId, report, images }: ConsultationCreateParams) => {
  const id = Math.random + '';
  const consultation: Consultation = {
    id,
    report: report || '',
    term: toTerm(term),
    images: images || [],
    medicalFileId,
  };
  consultations[id] = consultation;
  return Promise.resolve(consultation);
};

const update = ({ report, images, consultationId }: ConsultationUpdateParams) => {
  if (images && images.length) consultations[consultationId].images = images;
  if (report) consultations[consultationId].report = report;
  return Promise.resolve(consultations[consultationId]);
};

export const ConsultationAdapter: ConsultationPort = {
  findAll: () => Promise.resolve(Object.values(consultations)),
  findOneById: (id: string) => {
    const consultation = consultations[id];
    return consultation ? Promise.resolve(consultation) : Promise.reject();
  },
  create,
  update,
};
