'use strict';
(function () {
  var bookingMap = document.querySelector('.map');
  var mainPinController = bookingMap.querySelector('.map__pin--main');
  var pinsMap = document.querySelector('.map__pins');

  var mainPinLocationX = Math.round(parseInt(mainPinController.style.left, 10) - window.utils.MAIN_PIN_WIDTH / 2);
  var mainPinLocationY = Math.round(parseInt(mainPinController.style.top, 10) - window.utils.MAIN_PIN_HEIGHT);

  var accommodationFilters = bookingMap.querySelector('.map__filters-container');

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.ADS_COUNT; i++) {
    var advert = window.data.generateAds(i + 1);
    fragment.appendChild(window.createPinElement(advert));
  }

  var mapActivityHandler = function () {
    bookingMap.classList.remove('map--faded');
    window.bookingForm.classList.remove('ad-form--disabled');
    var formDisabledFields = window.bookingForm.querySelectorAll(':disabled');
    pinsMap.appendChild(fragment);
    var advertPins = pinsMap.querySelectorAll('.map__pin');

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
        if (evt.keyCode === window.utils.ESCAPE_BUTTON) {
          popupRemoveHandler();
        }
      };

      if (popupCard) {
        popupRemoveHandler();
      }

      bookingMap.insertBefore(window.createCardElement(card), accommodationFilters);
      document.addEventListener('keydown', popupEscHandler);
      var popupClose = bookingMap.querySelector('.popup__close');
      popupClose.addEventListener('click', popupRemoveHandler);
    };

    for (var j = 1; j < advertPins.length; j++) {
      openFullCardClickHandler(advertPins[j], window.data.generateAds(j));
    }

    for (var k = 0; k < formDisabledFields.length; k++) {
      formDisabledFields[k].disabled = false;
    }
    window.bookingForm.querySelector('input[name="address"]').value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  mainPinController.addEventListener('mousedown', mapActivityHandler);

  mainPinController.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_BUTTON) {
      mapActivityHandler();
    }
  });
})();
