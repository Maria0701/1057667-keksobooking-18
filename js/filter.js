'use strict';
(function () {
  var ACCOMMODATION_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var DEFAULT_FILTER_VALUE = 'any';
  var accommodationFilters = document.querySelector('.map__filters-container');
  var filterForm = accommodationFilters.querySelector('.map__filters');
  var accommodationTypeFilter = filterForm.querySelector('select[name="housing-type"]');
  var accommodationPriceFilter = filterForm.querySelector('select[name="housing-price"]');
  var accommodationRoomsFilter = filterForm.querySelector('select[name="housing-rooms"]');
  var accommodationGuestsFilter = filterForm.querySelector('select[name="housing-guests"]');
  var accommodationFeaturesFilter = filterForm.querySelector('.map__features');
  var changedAccommodationType;
  var changedAccommodationPrice;
  var changedAccommodationRooms;
  var changedAccommodationGuests;
  var changedAccommodationFeatures = [];
  var adverts = [];

  var compareArrays = function (where, what) {
    if (!what) {
      return true;
    }
    for (var i = 0; i < what.length; i++) {
      for (var j = 0; j < where.length; j++) {
        if (what[i] === where[j]) {
          break;
        }
        if (j === where.length - 1) {
          return false;
        }
      }
    }
    return true;
  };

  window.updatePins = function () {
    window.map.pinsMap.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
    var sameAccommodationTypes = adverts.filter(function (it) {
      console.log (it.offer);
      if (ACCOMMODATION_TYPES.includes(changedAccommodationType)) {
        return it.offer.type === changedAccommodationType;
      }
      if (changedAccommodationRooms && changedAccommodationRooms !== DEFAULT_FILTER_VALUE) {
        return String(it.offer.rooms) === changedAccommodationRooms;
      }
      if (changedAccommodationGuests && changedAccommodationGuests !== DEFAULT_FILTER_VALUE) {
        return String(it.offer.guests) === changedAccommodationGuests;
      }
      if (changedAccommodationPrice && changedAccommodationPrice !== DEFAULT_FILTER_VALUE) {
        if (it.offer.price > 50000) {
          it.offer.price = 'high';
        }
        if (it.offer.price < 10000) {
          it.offer.price = 'low';
        }
        if (it.offer.price >= 10000 && it.offer.price <= 50000) {
          it.offer.price = 'middle';
        }
        console.log (it.offer.price)
        return it.offer.price === changedAccommodationPrice;
      }
    //  if (compareArrays(it.offer.features, changedAccommodationFeatures)) {
    //      console.log(compareArrays(it.offer.features, changedAccommodationFeatures));
    //      console.log(changedAccommodationFeatures);
    //      return it.offer.features ;
    //  }
      return it.offer.type;
    });
    window.render(sameAccommodationTypes);
  };

  accommodationTypeFilter.addEventListener('change', function () {
    changedAccommodationType = accommodationTypeFilter.value;
    window.updatePins();
  });

  accommodationPriceFilter.addEventListener('change', function () {
    changedAccommodationPrice = accommodationPriceFilter.value;
    window.updatePins();
  });

  accommodationRoomsFilter.addEventListener('change', function () {
    changedAccommodationRooms = accommodationRoomsFilter.value;
    window.updatePins();
  });

  accommodationGuestsFilter.addEventListener('change', function () {
    changedAccommodationGuests = accommodationGuestsFilter.value;
    window.updatePins();
  });

  var chooseFeaturesHandler = function (evt) {
    if (evt.target.tagName === 'INPUT') {
      if (changedAccommodationFeatures.includes(evt.target.value)) {
        changedAccommodationFeatures.splice(changedAccommodationFeatures.indexOf(evt.target.value), 1);
      } else {
        changedAccommodationFeatures.push(evt.target.value);
      }
      window.updatePins();
    }
  };

  accommodationFeaturesFilter.addEventListener('click', chooseFeaturesHandler);

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
