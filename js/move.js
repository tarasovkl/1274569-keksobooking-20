'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');
  var PinSize = {
    WIDTH: 62,
    HEIGHT: 75
  };
  var PinSizeDisabled = {
    WIDTH: 62,
    HEIGHT: 62,
    LEFT: 570,
    TOP: 375
  };
  var MapSize = {
    MAX_X: 1200 - PinSize.WIDTH / 2,
    MIN_X: 0 - PinSize.WIDTH / 2,
    MAX_Y: 556,
    MIN_Y: 54
  };

  var defaultPinCoords = function () {
    var addressCoordsLeft = PinSizeDisabled.LEFT + (PinSizeDisabled.WIDTH / 2) + 'px';
    var addressCoordsTop = PinSizeDisabled.TOP + (PinSizeDisabled.HEIGHT / 2) + 'px';
    formAddress.value = Number.parseInt(addressCoordsLeft, 10) + ', ' + Number.parseInt(addressCoordsTop, 10);
  };
  defaultPinCoords();

  var newCoords = function () {
    var addressCoordsLeft = PinSizeDisabled.LEFT + (PinSizeDisabled.WIDTH / 2) + 'px';
    var addressCoordsTop = PinSizeDisabled.TOP + PinSize.HEIGHT + 'px';
    formAddress.value = Number.parseInt(addressCoordsLeft, 10) + ', ' + Number.parseInt(addressCoordsTop, 10);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newXCoords = mapPinMain.offsetLeft - shift.x;
      var newYCoords = mapPinMain.offsetTop - shift.y;

      if (newYCoords < MapSize.MAX_Y && newYCoords > MapSize.MIN_Y && newXCoords <= MapSize.MAX_X && newXCoords >= MapSize.MIN_X) {
        mapPinMain.style.top = newYCoords + 'px';
        mapPinMain.style.left = newXCoords + 'px';
        var AddressCoordsLeft = Number.parseInt(mapPinMain.style.left, 10);
        var AddressCoordsTop = Number.parseInt(mapPinMain.style.top, 10);
        formAddress.value = (AddressCoordsLeft + PinSize.WIDTH / 2) + ', ' + (AddressCoordsTop + PinSize.HEIGHT);
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
    mapPinMain.style = 'left: ' + PinSizeDisabled.LEFT + 'px; ' + 'top: ' + PinSizeDisabled.TOP + 'px;';
  };
  window.move = {
    resetPin: resetMainPin,
    resetPinCoords: defaultPinCoords,
    newPinCoords: newCoords,
  };
})();

