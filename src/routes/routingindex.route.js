// routes.js

const express = require('express');
const devicelocationRouter = require('../routes/deviceloactionmapping.route'); 
const itemmasterRouter = require('../routes/itemmaster.route'); 
const locationRouter = require('../routes/locationmaster.route'); 
const preprovisionRouter = require('../routes/preprovision.route'); 
const preprovisionitemsRouter = require('../routes/preprovisionitems.route');
const vendorRouter = require('../routes/vendordetails.route');

function setupRoutes(app) {
  app.use('/api/devicelocation', devicelocationRouter);
  app.use('/api/itemmaster', itemmasterRouter);
  app.use('/api/location', locationRouter);
  app.use('/api/preprovision', preprovisionRouter);
  app.use('/api/preprovisionitems', preprovisionitemsRouter);
  app.use('/api/vendor', vendorRouter);
}

module.exports = setupRoutes;
