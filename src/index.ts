const cors = require('cors');
import * as express from 'express';
import { repository, sequelize } from './infra/sequelize';

import routes from './routes/api';

const app = express();
const port = 3001;

const allowedOrigins = ['http://localhost:3000'];

const options = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    app.use(routes(repository));
    app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  })
  .catch(console.error);
