// @ts-check
const {getSession} = require('./dbUtils');
const Ads = require("../models/actions/ads");

const ADS = [
    {
        id: '1',
        title: 'Service 1',
        imageUrl: 'https://internt.slu.se/globalassets/mw/stod-serv/campus-och-hus/services.jpg',
        description: 'Description for service 1',
        contactInformation: 'Phone number 0990000001',
    },
    {
        id: '2',
        title: 'Product 1',
        imageUrl: 'https://ekit.co.uk/GalleryEntries/eCommerce_solutions_and_services/MedRes_Product-presentation-2.jpg',
        description: 'Description for product 1',
        contactInformation: 'Phone number 0990000002',
    }
];

const createAds = async () => {
  const session = getSession();

  for (const {
    id,
    title,
      imageUrl,
      description,
      contactInformation,
  } of ADS) {
    await session.query(
      'create (a:Ad {' +
        'id:$id,' +
        ' title:$title,' +
        ' imageUrl:$imageUrl,' +
        ' description:$description,' +
        ' contactInformation:$contactInformation})',
      {
        /** @ts-ignore */
        id,
        title,
        imageUrl,
        description,
        contactInformation,
      },
    );
  }
};

const initialize = async () => {
  const ads = await Ads.getAll(getSession());
  if (ads.length === 0) {
    console.log('Need to initialize');
    await createAds();
    console.log('Added ads');
  } else {
    console.log("Doesn't need to initialize");
  }
};

module.exports = {
  initialize,
  createAds,
};
