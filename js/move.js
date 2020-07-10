"use strict";

(function () {
  var MAP_PIN_CLICK = window.map.mappinclick;
  var MAP_PIN_MAIN = document.querySelector(".map__pin--main");
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

      MAP_PIN_MAIN.style.top = (MAP_PIN_MAIN.offsetTop - shift.y) + "px";
      MAP_PIN_MAIN.style.left = (MAP_PIN_MAIN.offsetLeft - shift.x) + "px";
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        MAP_PIN_MAIN.removeEventListener('click', MAP_PIN_CLICK);
      } else (MAP_PIN_MAIN.addEventListener('click', MAP_PIN_CLICK));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

