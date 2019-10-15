'use strict';
(function () {
  var bookingMap = document.querySelector('.map');
  var mainPinController = bookingMap.querySelector('.map__pin--main');
  var pinsMap = document.querySelector('.map__pins');

  var detectPinLocation = function () {
    return (window.bookingForm.querySelector('input[name="address"]').value = Math.round(parseInt(mainPinController.style.left, 10) - window.utils.MAIN_PIN_WIDTH / 2) + ', ' + Math.round(parseInt(mainPinController.style.top, 10) - window.utils.MAIN_PIN_HEIGHT));
  };

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
    pinsMap.appendChild(fragment); // отрисовка пинов
    // обработка пинов для активизации карточек
    var advertPins = pinsMap.querySelectorAll('.map__pin');
    // обработчик открытие карточки
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
      // если в разметке уже есть открытая карточка - удаляем
      if (popupCard) {
        popupRemoveHandler();
      }
      // формируем карточку
      bookingMap.insertBefore(window.createCardElement(card), accommodationFilters);
      document.addEventListener('keydown', popupEscHandler); // закрытие по эск
      var popupClose = bookingMap.querySelector('.popup__close');
      popupClose.addEventListener('click', popupRemoveHandler); // закрытие по кнопке
    };
    // выбираем объявление
    for (var j = 1; j < advertPins.length; j++) {
      openFullCardClickHandler(advertPins[j], window.data.generateAds(j));
    }
    // выбираем все неактивные элемены
    for (var k = 0; k < formDisabledFields.length; k++) {
      formDisabledFields[k].disabled = false;
    }
    // устанавливаем начальные координаты
    detectPinLocation();
  };

  mainPinController.addEventListener('mousedown', function (evt) {
    mapActivityHandler();
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (startCoords.y > window.data.MIN_Y && startCoords.y < window.data.MAX_Y) {
        mainPinController.style.top = (mainPinController.offsetTop - shift.y) + 'px';
      }

      if (startCoords.x > bookingMap.getBoundingClientRect().left && startCoords.x < bookingMap.getBoundingClientRect().right) {
        mainPinController.style.left = (mainPinController.offsetLeft - shift.x) + 'px';
      }

      detectPinLocation();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      detectPinLocation();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mainPinController.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_BUTTON) {
      mapActivityHandler(window.utils.MAIN_PIN_HEIGHT);
    }
  });
})();
