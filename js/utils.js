'use strict';

(function () {
  var ENTER_BUTTON = 13;
  var ESCAPE_BUTTON = 27;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  var getRandomArray = function (array) {
    return array.slice(getRandomInteger(0, array.length));
  };


  window.utils = {
    ENTER_BUTTON: ENTER_BUTTON,
    ESCAPE_BUTTON: ESCAPE_BUTTON,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    getRandomArray: getRandomArray
  };
})();
