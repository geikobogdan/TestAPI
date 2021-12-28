const ApiError = require("./api_error");

function apiErrorHandler(
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) {
  if (err instanceof ApiError) {
    res.status(err.code).send(err.errorObject);
    return;
  }

  res.status(500).json("something went wrong");
}

module.exports = apiErrorHandler;
