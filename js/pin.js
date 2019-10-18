'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var cardPopupTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  window.createPinElement = function (ad) {
    var pinElement = cardPopupTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').card = ad;
    return pinElement;
  };
})();
