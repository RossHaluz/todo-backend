const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const boardSchema = joi.object({
  title: joi.string().required(),
});

const columnSchema = joi.object({
  title: joi.string().required(),
});

const taskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().optional(),
  isChecked: joi.boolean().default(false).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  boardSchema,
  columnSchema,
  taskSchema,
};
