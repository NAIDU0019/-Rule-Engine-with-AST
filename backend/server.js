const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');
const errorHandler = require('./utils/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);



app.use('/api/rules', ruleRoutes);


mongoose.connect('mongodb://localhost:27017/ruleEngine', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server running on port 3000')))
  .catch(err => console.log(err));
