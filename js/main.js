'use strict';

var getRandomInteger = function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (arr) {
  return getRandomInteger(0, arr.length - 1);
};

var getRandomArray = function (array) {
  var newArray = [];
  for (var j = 0; j < getRandomInteger(1, array.length - 1); j++) {
    newArray = toString(array[j]);
  }
  return newArray;
};

var bookingMap = document.querySelector('.map');
bookingMap.classList.remove('map--faded');

var getRandomString = function (number) {
  var string = '';
  while (string.length < number) {
    string += Math.random().toString(36);
  }
  return string.substr(0, number);
};

var ACCOMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHEKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
var ACCOMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_X = 1200;
var KEKS_FRIENDS = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var generateKeksLocation = function () {
  return {
    x: getRandomInteger(0, MAX_X),
    y: getRandomInteger(MIN_Y, MAX_Y)
  };
};

var generateOfferOptions = function () {
  return {
    title: getRandomString(getRandomInteger(0, 100)),
    address: '{{location.' + generateKeksLocation().x + '}}, {{location.' + generateKeksLocation().y + '}}',
    price: getRandomInteger(0, 100),
    type: ACCOMODATION_TYPE[getRandomElement(ACCOMODATION_TYPE)],
    rooms: getRandomInteger(0, 10),
    guests: getRandomInteger(0, 10),
    checkin: CHEKIN_OUT_TIME[getRandomElement(CHEKIN_OUT_TIME)],
    checkout: CHEKIN_OUT_TIME[getRandomElement(CHEKIN_OUT_TIME)],
    features: getRandomArray(ACCOMODATION_FEATURES),
    description: getRandomString(getRandomInteger(0, 100)),
    photos: getRandomArray(ACCOMODATION_PHOTOS)
  };
};

var generateUser = function () {
  return {
    avatar: 'img/avatars/user0' + getRandomInteger(1, KEKS_FRIENDS) + '.png',
    location: generateKeksLocation(),
    offer: generateOfferOptions()
  };
};

var pinsMap = document.querySelector('.map__pins');
var pinKeksTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var createPinElement = function (pin) {
  var pinElement = pinKeksTemplate.cloneNode(true);
  pinElement.style.left = generateUser(pin).location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = generateUser(pin).location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').alt = generateUser(pin).offer.title;
  pinElement.querySelector('img').src = generateUser(pin).avatar;

  return pinElement;
};

var fragment = document.createDocumentFragment(generateUser);

for (var i = 0; i < KEKS_FRIENDS; i++) {
  fragment.appendChild(createPinElement(generateUser()));
}

pinsMap.appendChild(fragment);
