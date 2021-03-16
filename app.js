const express = require('express');
const logger = require('morgan');
const { userRouter, productRouter } = require('./routes');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(logger('dev'));

app.get('/', (req, res) => res.json({ welcome: 'hello' }));
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
