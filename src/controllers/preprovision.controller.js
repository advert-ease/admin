const preprovisionService = require('../services/vendordetails.service');

exports.createpreprovision = async (req, res) => {
    try {
      const preprovisionData = req.body;
      const preprovision = await  preprovisionService.createpreprovision(preprovisionData);
      res.status(201).json(preprovision);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
