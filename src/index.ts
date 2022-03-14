import * as express from 'express';
import { repository, sequelize } from './infra/sequelize';

import routes from './routes/api';

const app = express();
const port = 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    app.use(routes(repository));
    app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  })
  .catch(console.error);
