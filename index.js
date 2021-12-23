const express = require("express");
const router = require("./routes");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const requestDuration = require("./middleware/request-duration");
const authMiddleware = require("./middleware/auth");

const app = express();

const swaggerOptions = {
  info: {
    title: "API",
    version: "1.0.0",
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  filesPattern: "./routes/index.js",
  baseDir: __dirname,
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
};

app.use(express.json());

app.use(authMiddleware)

app.use(requestDuration);

expressJSDocSwagger(app)(swaggerOptions);

app.use(router);

app.listen(8080, () => console.log("server listening on port 8080"));
