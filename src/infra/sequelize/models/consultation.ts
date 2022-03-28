import { DataTypes, Model, ModelStatic, Optional, Sequelize } from 'sequelize';
import { Consultation } from '../../../domain/entities/consultation';
import { ConsultationPort } from '../../../domain/ports/consultation';
import { toTerm } from '../../../domain/entities/term';
import { MedicalFileInstance } from './medical-file';

interface ConsultationAttr {
  id: string;
  report: string | undefined;
  images: string[] | undefined;
  term: string;
}

interface ConsultationCreationAttributes extends Optional<ConsultationAttr, 'id'> {}

export interface ConsultationInstance
  extends Model<ConsultationAttr, ConsultationCreationAttributes>,
    ConsultationAttr {
  medicalFileId: string;
}

export const toEntity = (c: ConsultationInstance): Consultation => ({
  id: c.id,
  report: c.report || '',
  term: toTerm(c.term),
  images: c.images || [],
  medicalFileId: c.medicalFileId,
});

export default (sequelize: Sequelize) => (MedicalFile: ModelStatic<MedicalFileInstance>) => {
  const Consultation = sequelize.define<ConsultationInstance>('Consultation', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    report: { type: DataTypes.TEXT, allowNull: true },
    images: DataTypes.ARRAY(DataTypes.STRING),
    term: DataTypes.STRING,
  });

  const ConsultationAdapter: ConsultationPort = {
    findAll: () => Consultation.findAll().then(c => c.map(toEntity)),
    findOneById: (id: string) =>
      Consultation.findOne({ where: { id } }).then(c => (c ? toEntity(c) : Promise.reject('Consultation not found'))),
    create: ({ report, term, images, medicalFileId }) =>
      MedicalFile.findOne({ where: { id: medicalFileId } })
        .then(file => {
          if (!file) return Promise.reject('Medical file not found');
          return sequelize.transaction(transaction =>
            Consultation.create({ report, term, images }).then(consult =>
              Promise.all([consult, file.addConsultation(consult, { transaction })]),
            ),
          );
        })
        .then(([c]) => Consultation.findOne({ where: { id: c.id } }))
        .then(c => (c ? toEntity(c) : Promise.reject('Error when creating consultation.'))),
    update: ({ report, images, consultationId }) =>
      Consultation.update(
        { report, images },
        {
          returning: true,
          where: {
            id: consultationId,
          },
        },
      ).then(([nbRows, rows]) => {
        if (nbRows > 0) {
          return toEntity(rows[0]);
        }
        return Promise.reject('No consultation updated.');
      }),
  };
  return { Consultation, ConsultationAdapter };
};
