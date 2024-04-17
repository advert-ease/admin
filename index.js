require('dotenv').config();
const express = require("express");
const locationRouter = require('./src/routes/preprovisionitems.route'); 
const sequelize = require('./src/models/dbconnection');
const app = express();

//const cors = require('cors');



// Use CORS middleware
//app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// Mount the location route
app.use('/api', locationRouter); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server and database connection...');
    server.close(() => {
      console.log('Server closed');
      sequelize.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
      }).catch(err => {
        console.error('Error closing database connection:', err);
        process.exit(1);
      });
    });
});

/*
require('dotenv').config()
const express = require("express");
const testRouter = require('./src/routes/loactionmaster.route');
const sequelize = require('./src/models/dbconnection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// Mount the test route
app.use('/api', testRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server and database connection...');
    server.close(() => {
      console.log('Server closed');
      sequelize.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
      }).catch(err => {
        console.error('Error closing database connection:', err);
        process.exit(1);
      });
    });
  });
  
*/


