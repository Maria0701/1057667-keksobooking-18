'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var MAX_ADS_NUMBER = 5;
  var cardPopupTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var createPinElement = function (ad) {
    var pinElement = cardPopupTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').card = ad;
    return pinElement;
  };

  var render = function (data) {
    var takeNumber = data.length > MAX_ADS_NUMBER ? MAX_ADS_NUMBER : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.map.pinsMap.appendChild(createPinElement(data[i]));
    }
  };

  window.pin = {
    render: render
  };
})();
