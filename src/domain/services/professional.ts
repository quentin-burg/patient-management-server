// import { comparePassword } from '../../infra/password-hash';
// import { ProfessionalRegisterParams } from '../../shared.types';
// import { Repository } from '../ports';

// export default ({ professional: professionalRepo, patient: patientRepo }: Repository) => ({
//   findAll: () => professionalRepo.findAll(),
//   register: (args: ProfessionalRegisterParams) => professionalRepo.create(args),
//   login: (email: string, password: string) => {
//     return professionalRepo
//       .findOneByEmail(email)
//       .then(p =>
//         comparePassword(password, p.hash).then(isCorrect => (isCorrect ? p : Promise.reject('Login failed.'))),
//       );
//   },
//   addPatient: (patientEmail: string, professionalId: string) => {
//     return patientRepo.findOneByEmail(patientEmail).then(patient => {
//       if (patient) {
//         return professionalRepo.addPatient(patient.id, professionalId);
//       }
//       return Promise.reject('Patient not found');
//     });
//   },
// });
export {};
