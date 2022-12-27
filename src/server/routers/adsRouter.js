const {Router} = require('express');
const {ads} = require('../controllers');

const adsRouter = Router();

adsRouter.get('/', ads.list);
adsRouter.get('/:id', ads.findById);

module.exports = adsRouter;
