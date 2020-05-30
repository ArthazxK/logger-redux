import Joi from "joi-browser";

const schema = {
  username: Joi.string().email().min(5).max(25).required(),
  password: Joi.string().min(5).max(25).required(),
};

const validate = (tech) => {
  return Joi.validate(tech, schema);
};
