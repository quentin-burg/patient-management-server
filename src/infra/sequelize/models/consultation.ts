import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Consultation } from '../../../domain/entities/consultation/consultation';
import { ConsultationPort } from '../../../domain/ports/consultation';
import { toTerm } from '../../../domain/entities/consultation/term';

interface ConsultationAttr {
  id: string;
  report: string;
  images: string[];
  term: string;
}

interface ConsultationCreationAttributes extends Optional<ConsultationAttr, 'id'> {}

export interface ConsultationInstance
  extends Model<ConsultationAttr, ConsultationCreationAttributes>,
    ConsultationAttr {}

const toEntity = (c: ConsultationInstance): Consultation => ({
  id: c.id,
  report: c.report,
  term: toTerm(c.term),
  images: c.images,
});

export default (sequelize: Sequelize) => {
  const Consultation = sequelize.define<ConsultationInstance>('Consultation', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    report: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    term: DataTypes.STRING,
  });

  const ConsultationAdapter: ConsultationPort = {
    findAll: () => Consultation.findAll().then(c => c.map(toEntity)),
  };
  return { Consultation, ConsultationAdapter };
};
