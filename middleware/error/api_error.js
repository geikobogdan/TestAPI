class ApiError {
  static #customErrorFieldsArr = ["email", "name"];

  constructor(code, errorObject) {
    this.code = code;
    this.errorObject = errorObject;
  }

  // static badRequest(obj) {
  //   return new ApiError(400, obj);
  // }

  static unauthorized(obj) {
    return new ApiError(401, obj);
  }
  static conflict(obj) {
    return new ApiError(409, obj);
  }
  static internal(e, obj) {
    if (e?.errors) {
      if (ApiError.#customErrorFieldsArr.includes(e.errors[0]?.param)) {
        return ApiError.conflict(e);
      }
      if (e?.errors && e.errors[0]?.param === "login") {
        return ApiError.unauthorized(e);
      }
    }

    const customMsg = "An error occurred";

    return new ApiError(500, obj || customMsg);
  }
}

module.exports = ApiError;
