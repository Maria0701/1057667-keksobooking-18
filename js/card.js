'use strict';
(function () {
  var cardKeksTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var MAP_OFFER_TYPE_TO_TEXT = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'дворец'
  };

  window.createCardElement = function (card) {
    var cardElement = cardKeksTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
    cardElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '<span>/ночь</span>');
    cardElement.querySelector('.popup__type').textContent = MAP_OFFER_TYPE_TO_TEXT[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout + '.';
    var features = cardElement.querySelector('.popup__features');
    var feature = cardElement.querySelector('.popup__feature');
    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }
    for (var k = 0; k < card.offer.features.length; k++) {
      feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + card.offer.features[k]);
      features.appendChild(feature);
    }
    features.appendChild(feature);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var photos = cardElement.querySelector('.popup__photos');
    var photo = cardElement.querySelector('.popup__poto');
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }
    for (var j = 0; j < card.offer.photos.length; j++) {
      photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.setAttribute('width', '45');
      photo.setAttribute('height', '40');
      photo.setAttribute('src', card.offer.photos[j]);
      photos.appendChild(photo);
    }
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

})();
