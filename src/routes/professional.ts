// import * as express from 'express';
// import { getUserIdFromJWT, isAuthenticated, makeJWT } from '../infra/jwt';
// import { hashPassword } from '../infra/password-hash';
// import getProfessionalService from '../domain/services/professional';
// import { Repository } from '../domain/ports';

// export default (repository: Repository) => {
//   const apiRoutes = express.Router();
//   const { register, findAll, login, addPatient } = getProfessionalService(repository);

//   apiRoutes.get('/', (req, res, next) => {
//     return findAll()
//       .then(professionals => res.status(200).json({ success: true, professionals }))
//       .catch(next);
//   });

//   apiRoutes.post('/register', (req, res, next) => {
//     const { firstname, lastname, rpps, email, password } = req.body;
//     if (!firstname || !lastname || !rpps || !email || !password) return res.status(400).json({ success: false });
//     return hashPassword(password).then(hash =>
//       register({ firstname, lastname, rpps, email, hash })
//         .then(professional => ({ token: makeJWT(professional.id), professional }))
//         .then(({ professional, token }) => res.status(201).json({ success: true, professional, token }))
//         .catch(err => {
//           console.error(err);
//           return next();
//         }),
//     );
//   });

//   apiRoutes.post('/login', (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ success: false, reason: 'Missing parameter' });
//     return login(email, password)
//       .then(professional => ({ token: makeJWT(professional.id), professional }))
//       .then(({ professional, token }) => res.status(200).json({ success: true, professional, token }))
//       .catch(next);
//   });

//   apiRoutes.use(isAuthenticated);

//   apiRoutes.put('/addPatient', (req, res, next) => {
//     const { email } = req.body;
//     const userId = req.headers.authorization && getUserIdFromJWT(req.headers.authorization);
//     if (userId) {
//       return addPatient(email, userId).then(() => res.status(200).json({ success: true }));
//     }
//     return res.status(400).json({ success: false, reason: 'Cannot get professional id.' });
//   });

//   return apiRoutes;
// };
export {};
