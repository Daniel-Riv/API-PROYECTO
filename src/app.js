const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./database/connect-database');
// Middleware 
app.use(express.json());
app.use(cors());

// Setting
app.set('port', process.env.PORT || 5000);

// Routes
app.use('/api/matter', require('./routes/matterRoute'));
app.use('/api/activity', require('./routes/activityRoute'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

