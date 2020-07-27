'use strict';
(function () {
  var templateButton = document.querySelector('#pin').content.querySelector('button');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters-container');
  var formInputs = document.querySelectorAll('.ad-form__element');
  var mapFormInputs = mapFilters.querySelectorAll('.map__filter');
  var mapFeature = document.querySelector('.map__features');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var headerInput = document.querySelector('.ad-form-header__input');
  var templateImg = document.querySelector('#pin').content.querySelector('img');

  headerInput.disabled = true;

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
      var button = templateButton.cloneNode(true);
      button.style = 'left: ' + (pin.location.x - PinSize.WIDTH) + 'px;' + 'top:' + (pin.location.y - PinSize.HEIGHT) + 'px;';
      button.addEventListener('click', function (evt) {
        if (evt.button === 0) {
          window.card.delete();
          window.card.create(pin);
        }
      });
      fragment.appendChild(button);
    });

    mapPins.appendChild(fragment);
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
    mapFormInputs.forEach(function (input) {
      input.disabled = true;
    });
    formInputs.forEach(function (input) {
      input.disabled = true;
    });
    mapFeature.disabled = true;
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

  };

  disableActive();

  /**
   * Переводит страницу в активное состояние
   */
  var enableActive = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    headerInput.disabled = false;
    formInputs.forEach(function (input) {
      input.disabled = false;
    });
    mapFeature.disabled = false;
    mapFormInputs.forEach(function (input) {
      input.disabled = false;
    });
    window.load.data(window.filters.onSuccess, onError);
    window.move.newPinCoords();
    mapPinMain.removeEventListener('click', onMapPinClick);
    mapPinMain.removeEventListener('keydown', onMapPinClick);
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
  mapPinMain.addEventListener('click', onMapPinClick);

  mapPinMain.addEventListener('keydown', function (evt) {
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
