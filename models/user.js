const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
      name: String,
      surname: String,
      email: {
        type: String,
        unique: true
      },
      password: String
    }
  );

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;