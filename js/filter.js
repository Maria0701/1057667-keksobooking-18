'use strict';
(function () {
  var ACCOMMODATION_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var accommodationFilters = document.querySelector('.map__filters-container');
  var filterForm = accommodationFilters.querySelector('.map__filters');
  var accommodationTypeFilter = filterForm.querySelector('select[name="housing-type"]');
  var changedAccommodationType;
  var adverts = [];

  window.updatePins = function () {
    window.map.pinsMap.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
    var sameAccommodationTypes = adverts.filter(function (it) {
      if (ACCOMMODATION_TYPES.includes(changedAccommodationType)) {
        return it.offer.type === changedAccommodationType;
      }
      return it.offer.type;
    });
    window.render(sameAccommodationTypes);
  };

  accommodationFilters.addEventListener('change', function () {
    changedAccommodationType = accommodationTypeFilter.value;
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
