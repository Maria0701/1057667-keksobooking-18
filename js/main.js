'use strict';
var ENTER_BUTTON = 13;
var ESCAPE_BUTTON = 27;
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

// обработка формы
var MAP_OFFER_TYPE_TO_PRICE = {
  flat: '1000',
  bungalo: '0',
  house: '5000',
  palace: '10000'
};
var numberOfRooms = bookingForm.querySelector('select[name="rooms"]');
var numberOfGuests = bookingForm.querySelector('select[name="capacity"]');
var accommodationType = bookingForm.querySelector('select[name="type"]');
var accommodationPrice = bookingForm.querySelector('input[name="price"]');
var checkInTime = bookingForm.querySelector('select[name="timein"]');
var checkOutTime = bookingForm.querySelector('select[name="timeout"]');

var accommodationTypeToPriceHandler = function () {
  if (accommodationPrice.value >= 10000) {
    accommodationType.value = 'palace';
  } else if (accommodationPrice.value >= 5000 && accommodationPrice.value < 10000) {
    accommodationType.value = 'house';
  } else if (accommodationPrice.value >= 1000 && accommodationPrice.value < 5000) {
    accommodationType.value = 'flat';
  } else {
    accommodationType.value = 'bungalo';
  }
};

var accomodationMinPriceHandler = function () {
  accommodationPrice.min = MAP_OFFER_TYPE_TO_PRICE[accommodationType.value];
  accommodationPrice.placeholder = MAP_OFFER_TYPE_TO_PRICE[accommodationType.value];
};

var checkOutHandler = function () {
  checkInTime.value = checkOutTime.value;
};
var checkInHandler = function () {
  checkOutTime.value = checkInTime.value;
};

accommodationPrice.addEventListener('change', accommodationTypeToPriceHandler);
accommodationType.addEventListener('change', accomodationMinPriceHandler);
checkInTime.addEventListener('change', checkInHandler);
checkOutTime.addEventListener('change', checkOutHandler);

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

var ACCOMMODATION_TITLE = ['Сдам квартиру', 'Жилье для некурящих', 'Сдам аппартаменты', 'Мебелированные комнаты'];
var ACCOMMODATION_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHEKIN_OUT_TIME = ['12:00', '13:00', '14:00'];
var ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMMODATION_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ACCOMMODATION_DESCRIPTION = ['КВАРТИРА ЦЕЛИКОМ Студия в центре Минска, ст. м. Площадь Победы', 'ОТДЕЛЬНАЯ КОМНАТА В ЖИЛЬЕ ТИПА КВАРТИРА Уютная комната', 'КВАРТИРА ЦЕЛИКОМ Доступные апартаменты в самом центре Минска'];
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_X = 1200;
var ADS_COUNT = 8;
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

var accommodationFilters = bookingMap.querySelector('.map__filters-container');

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

for (var i = 0; i < ADS_COUNT; i++) {
  var advert = generateAds(i + 1);
  fragment.appendChild(createPinElement(advert));
}

var mapActivityHandler = function () {
  bookingMap.classList.remove('map--faded');
  bookingForm.classList.remove('ad-form--disabled');
  var formDisabledFields = bookingForm.querySelectorAll(':disabled');
  pinsMap.appendChild(fragment);
  var advertPins = pinsMap.querySelectorAll('.map__pin');

  //  var openFullCardEnterHandler = function (pin, card, evt) {
  //    pin.addEventListener('keydown', function () {
  //      if (evt.keyCode === ENTER_BUTTON) {
  //        openFullCardHandler(card);
  //      }
  //    });
  //  };

  var openFullCardClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      openFullCardHandler(card);
    });
  };

  var openFullCardHandler = function (card) {
    var popupCard = bookingMap.querySelector('.popup');
    var popupRemoveHandler = function () {
      bookingMap.querySelector('.popup').remove();
      document.removeEventListener('keydown', popupEscHandler);
    };

    var popupEscHandler = function (evt) {
      if (evt.keyCode === ESCAPE_BUTTON) {
        popupRemoveHandler();
      }
    };

    if (popupCard) {
      popupRemoveHandler();
    }
    bookingMap.insertBefore(createCardElement(card), accommodationFilters);
    document.addEventListener('keydown', popupEscHandler);
    var popupClose = bookingMap.querySelector('.popup__close');
    popupClose.addEventListener('click', popupRemoveHandler);
  };


  for (var j = 1; j < advertPins.length; j++) {
    openFullCardClickHandler(advertPins[j], generateAds(j));
  }

  for (var k = 0; k < formDisabledFields.length; k++) {
    formDisabledFields[k].disabled = false;
  }
  bookingForm.querySelector('input[name="address"]').value = mainPinLocationX + ', ' + mainPinLocationY;
};

mainPinController.addEventListener('mousedown', mapActivityHandler);

mainPinController.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    mapActivityHandler();
  }
});
