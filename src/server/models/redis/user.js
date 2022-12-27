// extracts just the data from the query results
const _ = require('lodash');

const User = function (_node) {
  const {email} = _node.properties;

  _.extend(this, {
    id: _node.properties.id,
    email,
  });
};
module.exports = User;
