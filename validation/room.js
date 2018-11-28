const Validator = require('validator');
const isEmpty = require('./isEmpty.js');

module.exports = validateRoomInput = data => {
  let errors = {};

  data.price = !isEmpty(data.price) ? data.price : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.number = !isEmpty(data.number) ? data.number : '';
  data.bed = !isEmpty(data.bed) ? data.bed : '';
  data.bathtub = !isEmpty(data.bathtub) ? data.bathtub : '';
  data.kitchen = !isEmpty(data.kitchen) ? data.kitchen : '';

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name must between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.number)) {
    errors.number = 'Number field is required';
  }

  if (!Validator.isLength(data.number, { min: 1, max: 4 })) {
    errors.number = 'Number must between 1 and 4 characters';
  }

  if (Validator.isEmpty(data.bed)) {
    errors.bed = 'Bed field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
