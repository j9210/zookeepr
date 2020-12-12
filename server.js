const express = require('express');
const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// access api/html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// instructs server to make certain files readily available and to not gate it behind a server endpoint
app.use(express.static('public'));

// method to make server listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

