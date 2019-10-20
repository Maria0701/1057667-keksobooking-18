'use strict';
(function () {

  var bookingMap = document.querySelector('.map');
  var mainPinController = bookingMap.querySelector('.map__pin--main');
  var pinsMap = document.querySelector('.map__pins');
  var resetCoords = {
    y: mainPinController.offsetTop,
    x: mainPinController.offsetLeft
  };

  var detectPinLocation = function () {
    return (window.bookingForm.querySelector('input[name="address"]').value = Math.round(parseInt(mainPinController.style.left, 10) - window.utils.MAIN_PIN_WIDTH / 2) + ', ' + Math.round(parseInt(mainPinController.style.top, 10) - window.utils.MAIN_PIN_HEIGHT));
  };

  var accommodationFilters = bookingMap.querySelector('.map__filters-container');

  var popupEscHandler = function (evt) {
    if (evt.keyCode === window.utils.ESCAPE_BUTTON) {
      popupRemoveHandler();
    }
  };

  var popupRemoveHandler = function () {
    bookingMap.querySelector('.popup').remove();
    document.removeEventListener('keydown', popupEscHandler);
  };

  window.mapPinClickHandler = function (evt) {
    var buttonPins = evt.target.parentElement;
    if (buttonPins.classList.contains('map__pin') && !buttonPins.classList.contains('map__pin--main')) {
      openFullCardHandler(evt.target.card);
    }
  };

  window.enterMapHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_BUTTON) {
      if (!evt.target.classList.contains('map__pin--main')) {
        openFullCardHandler(evt.target.firstChild.card);
      }
    }
  };

  var mapActivityHandler = function () {
    bookingMap.classList.remove('map--faded');
    window.bookingForm.classList.remove('ad-form--disabled');
    var formDisabledFields = window.bookingForm.querySelectorAll(':disabled');
    pinsMap.appendChild(window.fragment); // отрисовка пинов
    pinsMap.addEventListener('click', window.mapPinClickHandler);
    pinsMap.addEventListener('keydown', window.enterMapHandler);
    for (var k = 0; k < formDisabledFields.length; k++) {
      formDisabledFields[k].disabled = false;
    }
    detectPinLocation();
  };

  var openFullCardHandler = function (card) {
    var popupCard = bookingMap.querySelector('.popup');
    if (popupCard) {
      popupRemoveHandler();
    }
    bookingMap.insertBefore(window.createCardElement(card), accommodationFilters);
    document.addEventListener('keydown', popupEscHandler); // закрытие по эск
    var popupClose = bookingMap.querySelector('.popup__close');
    popupClose.addEventListener('click', popupRemoveHandler); // закрытие по кнопке
  };

  var successHandler = function (adverts) {
    window.render(adverts);
    window.pinMovementHandler();

    mainPinController.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_BUTTON) {
        mapActivityHandler(window.utils.MAIN_PIN_HEIGHT);
      }
    });
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var loadErrorHandler = function () {
    bookingMap.appendChild(errorTemplate.cloneNode(true));
  };

  window.backend.getDetails(successHandler, loadErrorHandler);

  window.map = {
    bookingMap: bookingMap,
    mainPinController: mainPinController,
    pinsMap: pinsMap,
    resetCoords: resetCoords,
    detectPinLocation: detectPinLocation,
    mapActivityHandler: mapActivityHandler
  };
})();
