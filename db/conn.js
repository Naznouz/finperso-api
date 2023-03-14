const mongoose = require('mongoose');

const connectionString =
  process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/finperso';

main()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = mongoose;
