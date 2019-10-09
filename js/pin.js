'use strict';
(function () {
  var cardPopupTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  window.createPinElement = function (ad) {
    var pinElement = cardPopupTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y + window.data.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.querySelector('img').src = ad.author.avatar;
    return pinElement;
  };
})();
