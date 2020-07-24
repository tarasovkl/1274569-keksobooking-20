'use strict';
(function () {
  var TEMPLATE_BUTTON = document.querySelector('#pin').content.querySelector('button');
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var FORM = document.querySelector('.ad-form');
  var MAP_FILTERS = document.querySelector('.map__filters-container');
  var FORM_INPUTS = document.querySelectorAll('.ad-form__element');
  var MAP_FORM = MAP_FILTERS.querySelectorAll('.map__filter');
  var MAP_FEATURE = document.querySelector('.map__features');
  var MAP_PINS = document.querySelector('.map__pins');
  var MAP = document.querySelector('.map');
  var HEADER_INPUT = document.querySelector('.ad-form-header__input');
  var templateImg = document.querySelector('#pin').content.querySelector('img');

  HEADER_INPUT.disabled = true;

  var PinSize = {
    WIDTH: 25,
    HEIGHT: 70
  };
  /**
   * Создает метки на карте
   * @param  {array} pinsData
   */
  var createPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    pinsData.forEach(function (pin) {
      templateImg.alt = pin.offer.title;
      templateImg.src = pin.author.avatar;
      var button = TEMPLATE_BUTTON.cloneNode(true);
      button.style = 'left: ' + (pin.location.x - PinSize.WIDTH) + 'px;' + 'top:' + (pin.location.y - PinSize.HEIGHT) + 'px;';
      button.addEventListener('click', function (evt) {
        if (evt.button === 0) {
          window.card.delete();
          window.card.create(pin);
        }
      });
      fragment.appendChild(button);
    });

    MAP_PINS.appendChild(fragment);
  };
  /**
   * Выводит в консоль сообщение об ошибке
   * @param  {string} errorMessage
   */
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  /**
   * Переводит страницу в неактивное состояние
   */
  var disableActive = function () {
    MAP_FORM.forEach(function (input) {
      input.disabled = true;
    });
    FORM_INPUTS.forEach(function (input) {
      input.disabled = true;
    });
    MAP_FEATURE.disabled = true;
    MAP.classList.add('map--faded');
    FORM.classList.add('ad-form--disabled');

  };

  disableActive();

  /**
   * Переводит страницу в активное состояние
   */
  var enableActive = function () {
    MAP.classList.remove('map--faded');
    FORM.classList.remove('ad-form--disabled');
    HEADER_INPUT.disabled = false;
    FORM_INPUTS.forEach(function (input) {
      input.disabled = false;
    });
    MAP_FEATURE.disabled = false;
    MAP_FORM.forEach(function (input) {
      input.disabled = false;
    });
    window.load.data(window.filters.onSuccess, onError);
    window.move.newPinCoords();
    MAP_PIN_MAIN.removeEventListener('click', onMapPinClick);
    MAP_PIN_MAIN.removeEventListener('keydown', onMapPinClick);
  };
  /**
   * Переводит страницу в активное состояние при нажатии
   * @param  {object} evt
   */
  var onMapPinClick = function (evt) {
    if (evt.button === 0) {
      enableActive();
    }
  };
  MAP_PIN_MAIN.addEventListener('click', onMapPinClick);

  MAP_PIN_MAIN.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enableActive();
    }
  });
  /**
   * Удаляет метки с карты
   */
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  window.map = {
    pinClick: onMapPinClick,
    disable: disableActive,
    render: createPins,
    delete: removePins
  };
})();
