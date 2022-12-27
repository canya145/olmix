const Users = require('../models/actions/users');
const {writeResponse} = require('../helpers/response');
const dbUtils = require('../db/dbUtils');

exports.register = function (req, res, next) {
  const {email, password} = req.body;

  if (!email) {
    throw {email: 'This field is required.', status: 400};
  }
  if (!password) {
    throw {password: 'This field is required.', status: 400};
  }

  Users.register(dbUtils.getSession(), email, password)
    .then((response) => writeResponse(res, response, 201))
    .catch(next);
};

exports.login = function (req, res, next) {
  const {email, password} = req.body;

  if (!email) {
    throw {email: 'This field is required.', status: 400};
  }
  if (!password) {
    throw {password: 'This field is required.', status: 400};
  }

  Users.login(dbUtils.getSession(), email, password)
    .then((response) => writeResponse(res, response))
    .catch(next);
};

exports.login = function (req, res, next) {
  const {email, password} = req.body;

  if (!email) {
    throw {email: 'This field is required.', status: 400};
  }
  if (!password) {
    throw {password: 'This field is required.', status: 400};
  }

  Users.login(dbUtils.getSession(), email, password)
    .then((response) => writeResponse(res, response))
    .catch(next);
};
