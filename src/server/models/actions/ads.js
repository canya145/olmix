const _ = require('lodash');
const Ad = require('../redis/ad');

// get all ads
const getAll = function (session) {
  return session
    .query('MATCH (ad:Ad) RETURN ad')
    .then((ads) => {
      return ads._results.map((ad) => new Ad(ad.get('ad')));
    });
};

// get a single ad by id
const getById = function (session, adId) {
  return session
    .query('MATCH (ad:Ad {id: $adId}) RETURN ad', {
      adId: adId.toString(),
    })
    .then((result) => {
      if (result.hasNext()) {
        return new Ad(result.next().get('ad'));
      }
      throw {message: 'ad not found', status: 404};
    });
};
// export exposed functions
module.exports = {
  getAll,
  getById,
};
