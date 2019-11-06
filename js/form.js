'use strict';
(function () {
  var MAP_OFFER_TYPE_TO_PRICE = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };
  var MAP_PRICE_TO_OFFER_TYPE = {
    '1000': 'flat',
    '0': 'bungalo',
    '5000': 'house',
    '10000': 'palace'
  };
  var MAX_ROOMS = '100';
  var MIN_ROOMS = '0';

  window.bookingForm = document.querySelector('.ad-form');
  var numberOfRooms = window.bookingForm.querySelector('select[name="rooms"]');
  var numberOfGuests = window.bookingForm.querySelector('select[name="capacity"]');
  var accommodationType = window.bookingForm.querySelector('select[name="type"]');
  var accommodationPrice = window.bookingForm.querySelector('input[name="price"]');
  var checkInTime = window.bookingForm.querySelector('select[name="timein"]');
  var checkOutTime = window.bookingForm.querySelector('select[name="timeout"]');


  var accommodationTypeToPriceHandler = function () {
    if (accommodationPrice.value >= Number(MAP_OFFER_TYPE_TO_PRICE.palace)) {
      accommodationType.value = MAP_PRICE_TO_OFFER_TYPE[10000];
    } else if (accommodationPrice.value >= Number(MAP_OFFER_TYPE_TO_PRICE.house) && accommodationPrice.value < Number(MAP_OFFER_TYPE_TO_PRICE.palace)) {
      accommodationType.value = MAP_PRICE_TO_OFFER_TYPE[5000];
    } else if (accommodationPrice.value >= Number(MAP_OFFER_TYPE_TO_PRICE.flat) && accommodationPrice.value < Number(MAP_OFFER_TYPE_TO_PRICE.house)) {
      accommodationType.value = MAP_PRICE_TO_OFFER_TYPE[1000];
    } else {
      accommodationType.value = MAP_PRICE_TO_OFFER_TYPE[0];
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
    if (numberOfRooms.value === MAX_ROOMS && numberOfGuests.value === MIN_ROOMS) {
      numberOfRooms.setCustomValidity('');
    } else if (numberOfRooms.value >= numberOfGuests.value && numberOfRooms.value !== MAX_ROOMS && numberOfGuests.value !== MIN_ROOMS) {
      numberOfRooms.setCustomValidity('');
    } else {
      numberOfRooms.setCustomValidity('Количество гостей больше больше количества комнат');
    }
  };
  changeOfNumberHandler();

  numberOfRooms.addEventListener('change', changeOfNumberHandler);
  numberOfGuests.addEventListener('change', changeOfNumberHandler);

  window.bookingForm.addEventListener('submit', function (evt) {
    window.backend.sendForm(new FormData(window.bookingForm), successHandler, loadErrorHandler);
    evt.preventDefault();
  });

  var loadHandler = function (template, classN) {
    window.bookingForm.appendChild(template.cloneNode(true));
    var element = window.bookingForm.querySelector(classN);
    var elementRemovalHandler = function () {
      element.remove();
      document.removeEventListener('keydown', elementEscHandler);
    };

    var elementEscHandler = function (evt) {
      if (evt.keyCode === window.utils.ESCAPE_BUTTON) {
        elementRemovalHandler();
      }
    };
    element.addEventListener('click', elementRemovalHandler);
    document.addEventListener('keydown', elementEscHandler);
  };

  var loadErrorHandler = function () {
    loadHandler(errorTemplate, '.error');
  };

  var successHandler = function () {
    window.bookingForm.reset();
    var allPins = document.querySelectorAll('.map__pin');
    allPins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        window.map.pinsMap.removeChild(pin);
      }
    });
    if (window.map.bookingMap.querySelector('.popup')) {
      window.map.bookingMap.querySelector('.popup').remove();
    }
    window.map.mainPinController.style.top = window.map.resetCoords.y + 'px';
    window.map.mainPinController.style.left = window.map.resetCoords.x + 'px';
    window.map.detectPinLocation();
    loadHandler(successTemplate, '.success');
    window.map.bookingMap.classList.add('map--faded');
    window.bookingForm.classList.add('ad-form--disabled');
    window.bookingForm.querySelectorAll('input').forEach(function (elem) {
      elem.disabled = true;
    });
    window.bookingForm.querySelectorAll('select').forEach(function (elem) {
      elem.disabled = true;
    });
    window.map.mainPinController.addEventListener('mousedown', window.map.mapActivityHandler);
  };

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
})();
