const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({ extended: true }));

app.use('/api/goods', require('./routes/goods.routes'));
app.use('/api/categories', require('./routes/categories.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
