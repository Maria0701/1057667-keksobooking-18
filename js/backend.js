'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    getDetails: load
  };
})();
