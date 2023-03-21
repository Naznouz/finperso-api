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

router.get('/:id', (req, res) => {
  const transaction = transactions.find(u => u.id === parseInt(req.params.id));
  if (!transactions) {
    return res.status(404).send('User not found');
  }
  res.json(transaction);
});

router.post('/', (req, res) => {
  /*const transactions = {
    type: req.body.type,
    categorie: req.body.categorie,
    montant: req.body.montant,
    date: req.body.date
  };
  transactions.push(transactions);
  res.json(transactions);*/

  const newTransaction = new Transactions(req.body);
  newTransaction.save((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(transaction);
    }
  });

}); 



module.exports = router;