const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const router = require('./routes');
const requestDuration = require('./middleware/request-duration');
const authMiddleware = require('./middleware/auth');
const { swaggerOptions } = require('./swagger_config');
const { DEV_PORT } = require('./config');
const apiErrorHandler = require('./middleware/error/api_error_handler');

const app = express();

app.use(express.json());

app.use(authMiddleware);

app.use(requestDuration);

expressJSDocSwagger(app)(swaggerOptions);

app.use(router);

app.use(apiErrorHandler);

app.listen(DEV_PORT, () => console.log(`server listening on port ${DEV_PORT}`));
