"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const express = require("express");
const sequelize_1 = require("./infra/sequelize");
const api_1 = require("./routes/api");
const app = express();
const port = 3001;
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelize_1.sequelize
    .sync( /* { force: true } */)
    .then(() => {
    app.use((0, api_1.default)(sequelize_1.repository));
    app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
})
    .catch(console.error);
