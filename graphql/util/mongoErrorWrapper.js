const CastError = require('mongoose').Error.CastError;
const ValidationError = require('mongoose').Error.ValidationError;
const UserInputError = require('apollo-server-express').UserInputError;

/**
 * This is a helper function that handles database errors.
 * It can be used to enhance any graphQL resolver function.
 */
module.exports = service => async (parent, args, context) => {
  try {
    const serviceResult = await service(parent, args, context);
    return serviceResult;
  } catch(err) {
    if (err instanceof CastError || err instanceof ValidationError) {
      throw new UserInputError(err.message);
    }
    return err;
  }
}
