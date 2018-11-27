const mongoose = require('mongoose');
const Room = require('../../models/Room.js');

module.exports = {
  Query: {
    allRooms: () => Room.find()
  }
};
