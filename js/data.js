'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAX_X = 1200;
  var MIN_X = 0;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var generateAds = function (advert) {
    return {
      author: {
        avatar: advert.author.avatar
      },
      location: {
        x: advert.location.x,
        y: advert.location.y
      },
      offer: {
        title: advert.offer.title,
        address: advert.offer.adress,
        price: advert.offer.price,
        type: advert.offer.type,
        rooms: advert.offer.rooms,
        guests: advert.offer.guests,
        checkin: advert.offer.checkin,
        checkout: advert.offer.checkout,
        features: advert.offer.features,
        description: advert.offer.description,
        photos: advert.offer.photos
      }
    };
  };

  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MAX_X: MAX_X,
    MIN_X: MIN_X,
    generateAds: generateAds
  };

})();
