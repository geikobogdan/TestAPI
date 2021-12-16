const express = require("express");
const router = require("./routes");
const expressJSDocSwagger = require("express-jsdoc-swagger");

const app = express();

const swaggerOptions = {
  info: {
    title: "API",
    version: "1.0.0",
  },
  filesPattern: "./routes/index.js",
  baseDir: __dirname,
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
};

app.use(express.json());

expressJSDocSwagger(app)(swaggerOptions);

app.use(router);

app.listen(8080, () => console.log("server listening on port 8080"));
