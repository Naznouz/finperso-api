var mongoose = require('../db/conn');
var express = require('express');
const { time } = require('console');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const TransactionsSchema = new mongoose.Schema(
    {
      id: String,
      type: String,
      categorie: String,
      montant: Number,
      date: Date
    },
    { strict: false }
  );
  const Transactions = mongoose.model('transactions', TransactionsSchema);

  const transactions = await Transactions.find({});

  res.send(transactions);
});

module.exports = router;