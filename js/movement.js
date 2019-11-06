'use strict';
(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAX_X = 1200;
  var MIN_X = 0;
  window.pinMovementHandler = function () {
    window.map.mainPinController.addEventListener('mousedown', function (evt) {
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

        var limits = {
          top: MIN_Y - window.utils.MAIN_PIN_HEIGHT,
          right: MAX_X - window.map.mainPinController.offsetWidth,
          bottom: MAX_Y - window.utils.MAIN_PIN_HEIGHT,
          left: MIN_X
        };

        if (limits.right < (window.map.mainPinController.offsetLeft - shift.x)) {
          window.map.mainPinController.style.left = limits.right + 'px';
        } else if (limits.left > (window.map.mainPinController.offsetLeft - shift.x)) {
          window.map.mainPinController.style.left = limits.left + 'px';
        } else {
          window.map.mainPinController.style.left = (window.map.mainPinController.offsetLeft - shift.x) + 'px';
        }

        if (limits.bottom < (window.map.mainPinController.offsetTop - shift.y)) {
          window.map.mainPinController.style.top = limits.bottom + 'px';
        } else if (limits.top > (window.map.mainPinController.offsetTop - shift.y)) {
          window.map.mainPinController.style.top = limits.top + 'px';
        } else {
          window.map.mainPinController.style.top = (window.map.mainPinController.offsetTop - shift.y) + 'px';
        }
        window.map.detectPinLocation();
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        window.map.detectPinLocation();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };
})();
