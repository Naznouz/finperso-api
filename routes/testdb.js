var mongoose = require('../db/conn');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const UsersSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
    },
    { strict: false }
  );
  const Users = mongoose.model('users', UsersSchema);

  const users = await Users.find({});

  res.send(users);
});

module.exports = router;
