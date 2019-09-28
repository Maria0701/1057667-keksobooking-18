'use strict';

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var getRandomArray = function (array) {
  var newArray = [];
  for (var j = 0; j < getRandomInteger(1, array.length); j++) {
    newArray = array[j];
  }
  return newArray;
};


var bookingMap = document.querySelector('.map');
bookingMap.classList.remove('map--faded');

var ACCOMODATION_TITLE = ['Сдам квартиру', 'Жилье для некурящих', 'Сдам аппартаменты', 'Мебелированные комнаты'];
var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHEKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
var ACCOMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ACCOMODATION_DESCRIPTION = ['КВАРТИРА ЦЕЛИКОМ Студия в центре Минска, ст. м. Площадь Победы', 'ОТДЕЛЬНАЯ КОМНАТА В ЖИЛЬЕ ТИПА КВАРТИРА Уютная комната', 'КВАРТИРА ЦЕЛИКОМ Доступные апартаменты в самом центре Минска'];
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_X = 1200;
var KEKS_FRIENDS = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var generateAds = function (i) {
  var userLocation = {
    x: getRandomInteger(0, MAX_X),
    y: getRandomInteger(MIN_Y, MAX_Y)
  };
  return {
    avatar: 'img/avatars/user0' + i + '.png',
    location: {
      x: userLocation.x,
      y: userLocation.y
    },
    offer: {
      title: getRandomElement(ACCOMODATION_TITLE),
      address: '{{location.' + userLocation.x + '}}, {{location.' + userLocation.y + '}}',
      price: getRandomInteger(0, 100),
      type: getRandomElement(ACCOMODATION_TYPE),
      rooms: getRandomInteger(0, 10),
      guests: getRandomInteger(0, 10),
      checkin: getRandomElement(CHEKIN_OUT_TIME),
      checkout: getRandomElement(CHEKIN_OUT_TIME),
      features: getRandomArray(ACCOMODATION_FEATURES),
      description: getRandomElement(ACCOMODATION_DESCRIPTION),
      photos: getRandomArray(ACCOMODATION_PHOTOS)
    }
  };
};

var pinsMap = document.querySelector('.map__pins');
var pinKeksTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var cardKeksTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');

var createPinElement = function (pin) {
  var pinElement = pinKeksTemplate.cloneNode(true);
  pinElement.style.left = generateAds(pin).location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = generateAds(pin).location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').alt = generateAds(pin).offer.title;
  pinElement.querySelector('img').src = generateAds(pin).avatar;

  return pinElement;
};


var createCardElement = function (card) {
  var cardElement = cardKeksTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = generateAds(card).offer.title;
  cardElement.querySelector('.popup__text--price').innerHTML = generateAds(card).offer.price + '<span>/ночь</span>';
  cardElement.querySelector('.popup__type').textContent = generateAds(card).offer.type;
  cardElement.querySelector('.popup__text--capacity').innerHTML = generateAds(card).offer.rooms + ' комнаты для ' + generateAds(card).offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + generateAds(card).offer.checkin + ', выезд до ' + generateAds(card).offer.checkout + '.';
  var featuresString = '';
  for (var i = 0; i < generateAds(card).offer.features.length; i++) {
    featuresString += '<li class="popup__feature popup__feature--' + generateAds(card).offer.features + '"></li>';
  }
  cardElement.querySelector('.popup__features').innerHTML = featuresString;
  cardElement.querySelector('.popup__description').textContent = generateAds(card).offer.description;
  var photosString = '';
  for (var j = 0; j < generateAds(card).offer.photos.length; j++) {
    photosString += '<img src=' + generateAds(card).offer.photos + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
  cardElement.querySelector('.popup__photos').innerHTML = photosString;

  return cardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < KEKS_FRIENDS; i++) {
  fragment.appendChild(createPinElement(generateAds()));
  fragment.appendChild(createCardElement(generateAds()));
}

pinsMap.appendChild(fragment);
