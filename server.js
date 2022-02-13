const express = require('express');
const app = express();
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./doc/swagger_output.json');

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('',routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Aplicação ativa na porta: ${port}`);
});