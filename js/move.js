"use strict";

(function () {
  var MAP_PIN_MAIN = document.querySelector(".map__pin--main");
  var FORM = document.querySelector(".ad-form");
  var FORM_ADDRESS = FORM.querySelector("#address");
  var PinSize = {
    WIDTH: 31,
    HEIGHT: 75
  };
  var PinSizeDisabled = {
    WIDTH: 31,
    HEIGHT: 31,
    LEFT: 570,
    TOP: 375
  };
  var MapSize = {
    MAX_X: 1200 - PinSize.WIDTH,
    MIN_X: -31,
    MAX_Y: 620,
    MIN_Y: 130
  };

  var defaultPinCoords = function () {
    var addressCoordsLeft = PinSizeDisabled.WIDTH + PinSizeDisabled.LEFT + 'px';
    var addressCoordsTop = PinSizeDisabled.HEIGHT + PinSizeDisabled.TOP + 'px';
    FORM_ADDRESS.value = Number.parseInt(addressCoordsLeft) + ", " + Number.parseInt(addressCoordsTop);
  };
  defaultPinCoords();

  var newCoords = function () {
    var addressCoordsLeft = PinSizeDisabled.WIDTH + PinSizeDisabled.LEFT + 'px';
    var addressCoordsTop = PinSize.HEIGHT + PinSizeDisabled.TOP + 'px';
    FORM_ADDRESS.value = Number.parseInt(addressCoordsLeft) + ", " + Number.parseInt(addressCoordsTop);
  };

  MAP_PIN_MAIN.addEventListener("mousedown", function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newXCoords = MAP_PIN_MAIN.offsetLeft - shift.x;
      var newYCoords = MAP_PIN_MAIN.offsetTop - shift.y

      if (newYCoords < MapSize.MAX_Y && newYCoords > MapSize.MIN_Y && newXCoords < MapSize.MAX_X && newXCoords > MapSize.MIN_X) {
        MAP_PIN_MAIN.style.top = newYCoords + "px";
        MAP_PIN_MAIN.style.left = newXCoords + "px";
        var AddressCoordsLeft = Number.parseInt(MAP_PIN_MAIN.style.left);
        var AddressCoordsTop = Number.parseInt(MAP_PIN_MAIN.style.top);
        FORM_ADDRESS.value = (AddressCoordsLeft + PinSize.WIDTH) + ", " + (AddressCoordsTop + PinSize.HEIGHT);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  /**
   * Сбрасывает положение главной метки на карте
   */
  var resetMainPin = function () {
    MAP_PIN_MAIN.style = 'left: ' + PinSizeDisabled.LEFT + 'px; ' + 'top: ' + PinSizeDisabled.TOP + 'px;';
  };
  window.move = {
    resetPin: resetMainPin,
    resetPinCoords: defaultPinCoords,
    newPinCoords: newCoords
  };
})();

