const requestDuration = (req, res, next) => {
  const start = Date.now();
  res.once("finish", () => {
    const duration = Date.now() - start;
    console.log(
      "Time taken to process " +
        req.method +
        " " +
        req.originalUrl +
        " is: " +
        duration +
        "ms"
    );
  });
  next();
};

module.exports = requestDuration;
