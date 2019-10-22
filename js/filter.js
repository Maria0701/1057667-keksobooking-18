'use strict';
(function () {
  var accommodationFilters = document.querySelector('.map__filters-container');
  var filterForm = accommodationFilters.querySelector('.map__filters');
  var accommodationTypeFilter = filterForm.querySelector('select[name="housing-type"]');
  var changedAccomodationType;
  var adverts = [];

  window.updatePins = function () {
    if (window.map.pinsMap.querySelector('.map__pin')) {
      window.map.pinsMap.querySelectorAll('.map__pin').forEach(function (item) {
        if (!item.classList.contains('map__pin--main')) {
          item.remove();
        }
      });
    }
    var sameAccomodationTypes = adverts.filter(function (it) {
      return it.offer.type === changedAccomodationType;
    });
    window.render(sameAccomodationTypes);
  };

  accommodationFilters.addEventListener('change', function () {
    changedAccomodationType = accommodationTypeFilter.value;
    window.updatePins();
  });
  var successHandler = function (data) {
    adverts = data;
    window.pinMovementHandler();

    window.map.mainPinController.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ENTER_BUTTON) {
        window.map.mapActivityHandler(window.utils.MAIN_PIN_HEIGHT);
      }
    });
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var loadErrorHandler = function () {
    window.map.bookingMap.appendChild(errorTemplate.cloneNode(true));
  };

  window.backend.getDetails(successHandler, loadErrorHandler);
})();
