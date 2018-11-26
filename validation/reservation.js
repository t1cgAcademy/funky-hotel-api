const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.reserver = !isEmpty(data.reserver) ? data.reserver : '';
  data.checkIn = !isEmpty(data.checkIn) ? data.checkIn : '';
  data.checkOut = !isEmpty(data.checkOut) ? data.checkOut : '';
  data.roomReserving = !isEmpty(data.roomReserving) ? data.roomReserving : '';

  if (Validator.isEmpty(data.reserver)) {
    errors.reserver = 'Reserver field is required';
  }

  if (Validator.isEmpty(data.checkIn)) {
    errors.checkIn = 'Check in field is required';
  }

  if (Validator.isEmpty(data.checkOut)) {
    errors.checkOut = 'Check out field is required';
  }

  if (Validator.isEmpty(data.roomReserving)) {
    errors.roomReserving = 'Room Reserving field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
