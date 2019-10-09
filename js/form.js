'use strict';
(function () {
  window.bookingForm = document.querySelector('.ad-form');
  var MAP_OFFER_TYPE_TO_PRICE = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };
  var numberOfRooms = window.bookingForm.querySelector('select[name="rooms"]');
  var numberOfGuests = window.bookingForm.querySelector('select[name="capacity"]');
  var accommodationType = window.bookingForm.querySelector('select[name="type"]');
  var accommodationPrice = window.bookingForm.querySelector('input[name="price"]');
  var checkInTime = window.bookingForm.querySelector('select[name="timein"]');
  var checkOutTime = window.bookingForm.querySelector('select[name="timeout"]');

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
})();
