'use strict';
var ENTER_BUTTON = 13;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var getRandomArray = function (array) {
  return array.slice(getRandomInteger(0, array.length));
};

var bookingMap = document.querySelector('.map');
var bookingForm = document.querySelector('.ad-form');
var mainPinController = bookingMap.querySelector('.map__pin--main');

var mainPinLocationX = Math.round(parseInt(mainPinController.style.left, 10) - MAIN_PIN_WIDTH / 2);
var mainPinLocationY = Math.round(parseInt(mainPinController.style.top, 10) - MAIN_PIN_HEIGHT);

var mapActivityHandler = function () {
  bookingMap.classList.remove('map--faded');
  bookingForm.classList.remove('ad-form--disabled');
  var formDisabledFields = bookingForm.querySelectorAll(':disabled');
  for (var i = 0; i < formDisabledFields.length; i++) {
    formDisabledFields[i].disabled = false;
  }
  bookingForm.querySelector('input[name="address"]').value = mainPinLocationX + ', ' + mainPinLocationY;
};

mainPinController.addEventListener('mousedown', mapActivityHandler);

mainPinController.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    mapActivityHandler();
  }
});

var numberOfRooms = bookingForm.querySelector('select[name="rooms"]');
var numberOfGuests = bookingForm.querySelector('select[name="capacity"]');
var changeOfNumberHandler = function () {
  if (numberOfRooms.value === '100' && numberOfGuests.value === '0') {
    numberOfRooms.setCustomValidity('');
  } else if (numberOfRooms.value >= numberOfGuests.value && numberOfRooms.value !== '100' && numberOfGuests.value !== '0') {
    numberOfRooms.setCustomValidity('');
  } else {
    numberOfRooms.setCustomValidity('Количество гостей больше больше количества комнат');
  }
};
changeOfNumberHandler();

numberOfRooms.addEventListener('change', changeOfNumberHandler);
numberOfGuests.addEventListener('change', changeOfNumberHandler);

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
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
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

// var pinsMap = document.querySelector('.map__pins');
var pinKeksTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var createPinElement = function (ad) {
  var pinElement = pinKeksTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.querySelector('img').src = ad.author.avatar;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < KEKS_FRIENDS; i++) {
  fragment.appendChild(createPinElement(generateAds(i + 1)));
}
