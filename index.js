require('dotenv').config();
const express = require("express");
const sequelize = require('./src/models/dbconnection');
const app = express();



const devicelocationRouter = require('./src/routes/deviceloactionmapping.route'); 
const itemmasterRouter = require('./src/routes/itemmaster.route'); 
const locationRouter = require('./src/routes/locationmaster.route'); 
const preprovisionRouter = require('./src/routes/preprovision.route'); 
const preprovisionitemsRouter = require('./src/routes//preprovisionitems.route');
const vendorRouter = require('./src/routes/vendordetails.route');

// Mount the location route
  app.use('/api', devicelocationRouter);
  app.use('/api', itemmasterRouter);
  app.use('/api', locationRouter);
  app.use('/api', preprovisionRouter);
  app.use('/api', preprovisionitemsRouter);
  app.use('/api', vendorRouter);

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;




// Define a basic route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Handle SIGINT (Ctrl+C) gracefully
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


