'use strict';

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
bookingMap.classList.remove('map--faded');

var ACCOMMODATION_TITLE = ['Сдам квартиру', 'Жилье для некурящих', 'Сдам аппартаменты', 'Мебелированные комнаты'];
var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHEKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ACCOMMODATION_DESCRIPTION = ['КВАРТИРА ЦЕЛИКОМ Студия в центре Минска, ст. м. Площадь Победы', 'ОТДЕЛЬНАЯ КОМНАТА В ЖИЛЬЕ ТИПА КВАРТИРА Уютная комната', 'КВАРТИРА ЦЕЛИКОМ Доступные апартаменты в самом центре Минска'];
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
      title: getRandomElement(ACCOMMODATION_TITLE),
      address: '{{location.' + userLocation.x + '}}, {{location.' + userLocation.y + '}}',
      price: getRandomInteger(0, 100),
      type: getRandomElement(ACCOMMODATION_TYPE),
      rooms: getRandomInteger(0, 10),
      guests: getRandomInteger(0, 10),
      checkin: getRandomElement(CHEKIN_OUT_TIME),
      checkout: getRandomElement(CHEKIN_OUT_TIME),
      features: getRandomArray(ACCOMMODATION_FEATURES),
      description: getRandomElement(ACCOMMODATION_DESCRIPTION),
      photos: getRandomArray(ACCOMMODATION_PHOTOS)
    }
  };
};

var pinsMap = document.querySelector('.map__pins');
var cardPopupTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var createPinElement = function (ad) {
  var pinElement = cardPopupTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').alt = ad.offer.title;
  pinElement.querySelector('img').src = ad.author.avatar;

  return pinElement;
};


var accommodationMap = document.querySelector('.map');
var accommodationFilters = accommodationMap.querySelector('.map__filters-container');

var cardKeksTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var MAP_OFFER_TYPE_TO_TEXT = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'дворец'
};

var createCardElement = function (card) {
  var cardElement = cardKeksTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '<span>/ночь</span>');
  cardElement.querySelector('.popup__type').textContent = MAP_OFFER_TYPE_TO_TEXT[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout + '.';
  var features = cardElement.querySelector('.popup__features');
  var feature = cardElement.querySelector('.popup__feature');
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  for (var k = 0; k < card.offer.features.length; k++) {
    feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + card.offer.features[k]);
    features.appendChild(feature);
  }
  features.appendChild(feature);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  var photos = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__poto');
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }
  for (var j = 0; j < card.offer.photos.length; j++) {
    photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('src', card.offer.photos[j]);
    photos.appendChild(photo);
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < KEKS_FRIENDS; i++) {
  fragment.appendChild(createPinElement(generateAds(i + 1)));
}

pinsMap.appendChild(fragment);
accommodationMap.insertBefore(createCardElement(generateAds(i)), accommodationFilters);
