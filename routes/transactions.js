var mongoose = require('../db/conn');
var express = require('express');
const { time } = require('console');
var router = express.Router();

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


/* GET transaction listing. */
router.get('/', async function(req, res, next) {

  const transactions = await Transactions.find({});

  res.send(transactions);
});

router.get('/:id', async(req, res) => {
  const transaction = await Transactions.findById(req.params.id);
  if (!transactions) {
    return res.status(404).send('User not found');
  }
  res.send(transaction);
});

router.post('/', async(req, res) => {

  const newTransaction = new Transactions(req.body);
  await newTransaction.save();
  return res.send(user);

}); 

router.put('/:id', async(req, res) => {
  const transaction = await Transactions.findById(req.params.id);
  if (!transaction) {
    return res.status(404).send('User not found');
  }
  transaction.type = req.body.type;
  transaction.categorie = req.body.categorie;
  transaction.montant = req.body.montant;
  transaction.date = req.body.date;
  await transaction.save();
  res.send(transaction);
});


module.exports = router;