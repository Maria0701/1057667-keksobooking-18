'use strict';

(function () {
  var ACCOMMODATION_TITLE = ['Сдам квартиру', 'Жилье для некурящих', 'Сдам аппартаменты', 'Мебелированные комнаты'];
  var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHEKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
  var ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ACCOMMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ACCOMMODATION_DESCRIPTION = ['КВАРТИРА ЦЕЛИКОМ Студия в центре Минска, ст. м. Площадь Победы', 'ОТДЕЛЬНАЯ КОМНАТА В ЖИЛЬЕ ТИПА КВАРТИРА Уютная комната', 'КВАРТИРА ЦЕЛИКОМ Доступные апартаменты в самом центре Минска'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAX_X = 1200;
  var MIN_X = 0;
  var ADS_COUNT = 8;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var generateAds = function (i) {
    var userLocation = {
      x: window.utils.getRandomInteger(0, MAX_X),
      y: window.utils.getRandomInteger(MIN_Y, MAX_Y)
    };
    return {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      location: {
        x: userLocation.x,
        y: userLocation.y
      },
      offer: {
        title: window.utils.getRandomElement(ACCOMMODATION_TITLE),
        address: '{{location.' + userLocation.x + '}}, {{location.' + userLocation.y + '}}',
        price: window.utils.getRandomInteger(0, 100),
        type: window.utils.getRandomElement(ACCOMMODATION_TYPE),
        rooms: window.utils.getRandomInteger(0, 10),
        guests: window.utils.getRandomInteger(0, 10),
        checkin: window.utils.getRandomElement(CHEKIN_OUT_TIME),
        checkout: window.utils.getRandomElement(CHEKIN_OUT_TIME),
        features: window.utils.getRandomArray(ACCOMMODATION_FEATURES),
        description: window.utils.getRandomElement(ACCOMMODATION_DESCRIPTION),
        photos: window.utils.getRandomArray(ACCOMMODATION_PHOTOS)
      }
    };
  };

  window.data = {
    ADS_COUNT: ADS_COUNT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MAX_X: MAX_X,
    MIN_X: MIN_X,
    generateAds: generateAds
  };

})();
