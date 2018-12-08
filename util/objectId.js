/**
 * This is required in order to convert all mongoDB object IDs to strings for graphql
 */
const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};