'use strict';
var ENTER_BUTTON = 13;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;


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
