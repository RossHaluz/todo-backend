const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorDetails = error.details[0];
      const errorName = errorDetails.context.label;
      throw HttpError(400, `missing required ${errorName} field`);
    }

    next();
  };

  return func;
};

module.exports = {
  validateBody,
};
