var mongoose = require('../db/conn');
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();



// Models
const Users = require('../models/user');

// GET Users
router.get('/', async (req, res) => {
  // do not return password
  try {
    const users = await Users.find({}, { password: 0 });
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

// GET User by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId, { password: 0 });
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'User not found' });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
})

// POST User
router.post('/', async (req, res) => {
  try {
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    });
    await user.save();
    return res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ error: 'User already exists' });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
})

// PUT User
router.put('/:userId', async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: 'User not found' });
    }
    return res.status(500).send({ error: 'Internal Server Error' });
  }
})

module.exports = router;