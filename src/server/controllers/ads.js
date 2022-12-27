const Ads = require('../models/actions/ads');
const {writeResponse} = require('../helpers/response');
const dbUtils = require('../db/dbUtils');


exports.list = function (req, res, next) {
  Ads.getAll(dbUtils.getSession())
    .then((response) => writeResponse(res, response))
    .catch(next);
};

exports.findById = function (req, res, next) {
  Ads.getById(dbUtils.getSession(), req.params.id)
    .then((response) => writeResponse(res, response))
    .catch(next);
};
