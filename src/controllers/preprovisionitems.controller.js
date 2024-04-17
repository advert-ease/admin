const PreProvisionItemsService = require('../services/preprovisionitems.service');

exports.createPreProvisionItem = async (req, res, next) => {
  try {
      const item = await PreProvisionItemsService.createPreProvisionItem(req.body);
      res.status(201).json(item);
  } catch (error) {
      next(error);
  }
};

exports.updatePreProvisionItem = async (req, res, next) => {
  const slNo = req.params.slNo;
  try {
      const updatedItem = await PreProvisionItemsService.updatePreProvisionItem(slNo, req.body);
      res.status(200).json(updatedItem);
  } catch (error) {
      next(error);
  }
};

exports.getAllPreProvisionItems = async (req, res, next) => {
  try {
      const allItems = await PreProvisionItemsService.getAllPreProvisionItems();
      res.status(200).json(allItems);
  } catch (error) {
      next(error);
  }
};

exports.getPreProvisionItemById = async (req, res, next) => {
  const slNo = req.params.slNo;
  try {
      const item = await PreProvisionItemsService.getPreProvisionItemById(slNo);
      res.status(200).json(item);
  } catch (error) {
      next(error);
  }
};
