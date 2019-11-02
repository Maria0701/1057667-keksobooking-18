'use strict';
(function () {
  var URL_ADVERT_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_ADVERT_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 5000;
  var SUCCESS_CODE = 200;

  var serverRequestHandler = function (what, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(what, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    serverRequestHandler('GET', URL_ADVERT_LOAD, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    serverRequestHandler('POST', URL_ADVERT_SAVE, onLoad, onError, data);
  };

  window.backend = {
    getDetails: load,
    sendForm: save
  };
})();
