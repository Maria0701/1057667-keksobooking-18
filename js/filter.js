'use strict';
(function () {
  var ACCOMMODATION_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var DEFAULT_FILTER_VALUE = 'any';
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var HIGH_PRICE = 'high';
  var LOW_PRICE = 'low';
  var MIDDLE_PRICE = 'middle';
  var INPUT_TAG_NAME = 'INPUT';
  var accommodationFilters = document.querySelector('.map__filters-container');
  var filterForm = accommodationFilters.querySelector('.map__filters');
  var accommodationTypeFilter = filterForm.querySelector('select[name="housing-type"]');
  var accommodationPriceFilter = filterForm.querySelector('select[name="housing-price"]');
  var accommodationRoomsFilter = filterForm.querySelector('select[name="housing-rooms"]');
  var accommodationGuestsFilter = filterForm.querySelector('select[name="housing-guests"]');
  var changedAccommodationType;
  var changedAccommodationPrice;
  var changedAccommodationRooms;
  var changedAccommodationGuests;
  var changedAccommodationFeatures = [];
  var adverts = [];

  var compareArrays = function (where, what) {
    if (where.length === 0) {
      return false;
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

  var getPriceRange = function (rate) {
    if (rate > MAX_PRICE) {
      return HIGH_PRICE;
    }
    if (rate < MIN_PRICE) {
      return LOW_PRICE;
    }
    return MIDDLE_PRICE;
  };

  var chooseFeaturesHandler = function (evt) {
    if (evt.target.tagName === INPUT_TAG_NAME) {
      if (changedAccommodationFeatures.includes(evt.target.value)) {
        changedAccommodationFeatures.splice(changedAccommodationFeatures.indexOf(evt.target.value), 1);
      } else {
        changedAccommodationFeatures.push(evt.target.value);
      }
    }
  };

  window.updatePins = function () {
    window.map.pinsMap.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
    if (window.map.bookingMap.querySelector('.popup')) {
      window.map.popupRemoveHandler();
    }

    var sameAccommodation = adverts.filter(function (it) {
      var sameAccommodationType = function () {
        if (ACCOMMODATION_TYPES.includes(changedAccommodationType)) {
          return it.offer.type === changedAccommodationType;
        }
        return true;
      };
      var sameAccommodationRooms = function () {
        if (changedAccommodationRooms && changedAccommodationRooms !== DEFAULT_FILTER_VALUE) {
          return String(it.offer.rooms) === changedAccommodationRooms;
        }
        return true;
      };
      var sameAccommodationGuests = function () {
        if (changedAccommodationGuests && changedAccommodationGuests !== DEFAULT_FILTER_VALUE) {
          return String(it.offer.guests) === changedAccommodationGuests;
        }
        return true;
      };
      var sameAccommodationPrice = function () {
        if (changedAccommodationPrice && changedAccommodationPrice !== DEFAULT_FILTER_VALUE) {
          return getPriceRange(it.offer.price) === changedAccommodationPrice;
        }
        return true;
      };
      var sameAccommodationFeatures = function () {
        if (changedAccommodationFeatures.length > 0) {
          return compareArrays(it.offer.features, changedAccommodationFeatures);
        }
        return true;
      };
      return sameAccommodationType() && sameAccommodationRooms() && sameAccommodationGuests() && sameAccommodationPrice() && sameAccommodationFeatures();
    });
    window.pin.render(sameAccommodation);
  };

  var accomodationFiltersHandler = window.debounce(function (evt) {
    if (evt.target === accommodationTypeFilter) {
      changedAccommodationType = evt.target.value;
    }
    if (evt.target === accommodationPriceFilter) {
      changedAccommodationPrice = evt.target.value;
    }
    if (evt.target === accommodationRoomsFilter) {
      changedAccommodationRooms = evt.target.value;
    }
    if (evt.target === accommodationGuestsFilter) {
      changedAccommodationGuests = evt.target.value;
    }
    chooseFeaturesHandler(evt);
    window.updatePins();
  });

  accommodationFilters.addEventListener('change', accomodationFiltersHandler);

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var loadErrorHandler = function () {
    window.map.bookingMap.appendChild(errorTemplate.cloneNode(true));
  };
  var successHandler = function (data) {
    adverts = data;
    window.updatePins();
  };

  window.loadSimilarAds = function () {
    window.backend.getDetails(successHandler, loadErrorHandler);
  };
})();
