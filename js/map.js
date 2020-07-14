"use strict";
(function () {
  var CARDS = window.card.allCards;
  var ALLDATA = window.pin.data;
  var template = document.querySelector('#pin').content;
  var templateButton = document.querySelector('#pin').content.querySelector('button');
  var TEMPLATE_IMG = document.querySelector('#pin').content.querySelector('img');
  var MAP_PIN_MAIN = document.querySelector(".map__pin--main");
  var FORM = document.querySelector(".ad-form");
  var MAP_FILTERS = document.querySelector(".map__filters-container");
  var FORM_INPUTS = document.querySelectorAll(".ad-form__element");
  var MAP_FORM = MAP_FILTERS.querySelectorAll(".map__filter");
  var MAP_FEATURE = document.querySelector(".map__features");
  var MAP_PINS = document.querySelector('.map__pins');
  var MAP = document.querySelector('.map');
  var HEADER_INPUT = document.querySelector(".ad-form-header__input");
  HEADER_INPUT.disabled = true;




  /**
   * Создает метки на карте
   * @param  {array} pinsData
   */
  var createPins = function (pinsData) {
    var fragment = document.createDocumentFragment();

    pinsData.forEach(function (item) {
      TEMPLATE_IMG.alt = item.offer.title;
      TEMPLATE_IMG.src = item.author.avatar;
      var button = templateButton.cloneNode(true);
      button.style = "left: " + item.location.x + "px;" + "top:" + item.location.y + "px;";
      fragment.appendChild(button);
    });

    MAP_PINS.appendChild(fragment);
  };



  var onError = function (message) {
    console.error(message);
  };


  /**
   * Переводит страницу в неактивное состояние
   */
  var disableActive = function () {
    MAP_FORM.forEach(function (item) {
      item.disabled = true;
    });
    FORM_INPUTS.forEach(function (item) {
      item.disabled = true;
    });
    MAP_FEATURE.disabled = true;
  };

  disableActive();

  /**
   * Переводит страницу в активное состояние
   */
  var enableActive = function () {
    MAP.classList.remove("map--faded");
    FORM.classList.remove("ad-form--disabled");
    HEADER_INPUT.disabled = false;
    FORM_INPUTS.forEach(function (item) {
      item.disabled = false;
    });
    MAP_FEATURE.disabled = false;
    MAP_FORM.forEach(function (item) {
      item.disabled = false;
    });
    window.load.data(createPins, onError);
    window.load.data(window.card.createData, onError);
  };






  var onMapPinClick = function (evt) {
    if (evt.button === 0) {
      enableActive();
    };
  };

  MAP_PIN_MAIN.addEventListener("click", onMapPinClick);

  MAP_PIN_MAIN.addEventListener("keydown", function (evt) {
    if (evt.key === "Enter") {
      enableActive();
    }
  });
  window.map = {
    pinClick: onMapPinClick,
  };
})();
