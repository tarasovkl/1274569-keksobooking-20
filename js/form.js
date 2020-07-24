'use strict';

(function () {

  var MAIN = document.querySelector('main');
  var FORM = document.querySelector('.ad-form');
  var TITLE_INPUT = document.querySelector('#title');
  var PLACE_TYPE = document.querySelector('#type');
  var PLACE_PRICE = document.querySelector('#price');
  var TIMEIN = document.querySelector('#timein');
  var TIMEOUT = document.querySelector('#timeout');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var CAPACITY = document.querySelector('#capacity');
  var RESET = document.querySelector('.ad-form__reset');
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');

  var TitleValidity = {
    MINLENGHT: 30,
    MAXLENGTH: 100
  };

  var Types = {
    BUNGALO: {
      price: 0,
      type: 'bungalo',
      minPrice: 0
    },
    FLAT: {
      price: 1000,
      type: 'flat',
      minPrice: 1000
    },
    HOUSE: {
      price: 5000,
      type: 'house',
      minPrice: 5000
    },
    PALACE: {
      price: 10000,
      type: 'palace',
      minPrice: 10000
    }
  };

  var defaultValues = {
    MAX_PRICE: 1000000,
    MIN_PRICE: 0,
    CAPACITY: 1
  };

  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['100']
  };

  TITLE_INPUT.addEventListener('invalid', function () {
    if (TITLE_INPUT.validity.valueMissing) {
      TITLE_INPUT.setCustomValidity('Обязательное поле');
    } else {
      TITLE_INPUT.setCustomValidity('');
    }
  });

  TITLE_INPUT.addEventListener('input', function () {
    var TITLE_INPUT_LENGTH = TITLE_INPUT.value.length;
    if (TITLE_INPUT_LENGTH < TitleValidity.MINLENGHT) {
      TITLE_INPUT.setCustomValidity('Ещё ' + (TitleValidity.MINLENGHT - TITLE_INPUT_LENGTH) + ' симв.');
    } else if (TITLE_INPUT_LENGTH > TitleValidity.MAXLENGTH) {
      TITLE_INPUT.setCustomValidity('Удалите лишние ' + (TITLE_INPUT_LENGTH - TitleValidity.MAXLENGTH) + ' симв.');
    } else {
      TITLE_INPUT.setCustomValidity('');
    }
  });

  PLACE_PRICE.placeholder = Types.FLAT.price;
  PLACE_PRICE.max = defaultValues.MAX_PRICE;
  PLACE_PRICE.min = defaultValues.MIN_PRICE;

  PLACE_TYPE.addEventListener('change', function () {
    if (PLACE_TYPE.value === Types[PLACE_TYPE.value.toUpperCase()].type) {
      PLACE_PRICE.placeholder = Types[PLACE_TYPE.value.toUpperCase()].price;
      PLACE_PRICE.min = Types[PLACE_TYPE.value.toUpperCase()].minPrice;
    }
  });

  TIMEIN.addEventListener('change', function () {
    TIMEOUT.value = TIMEIN.value;
  });

  TIMEOUT.addEventListener('change', function () {
    TIMEIN.value = TIMEOUT.value;
  });

  CAPACITY.value = roomsForGuests[1];

  ROOM_NUMBER.addEventListener('change', function () {
    ROOM_NUMBER.setCustomValidity('');
    if (!roomsForGuests[ROOM_NUMBER.value].includes(CAPACITY.value)) {
      ROOM_NUMBER.setCustomValidity('Количество комнат не должно быть меньше количества мест (100 комнат - не для гостей)');
    } else {
      CAPACITY.setCustomValidity('');
    }
  });

  CAPACITY.addEventListener('change', function () {
    CAPACITY.setCustomValidity('');
    if (!roomsForGuests[ROOM_NUMBER.value].includes(CAPACITY.value)) {
      CAPACITY.setCustomValidity('Количество мест не должно превышать количество комнат (100 комнат - не для гостей)');
    } else {
      ROOM_NUMBER.setCustomValidity('');
    }
  });
  /**
   * Добавляет сообщение об отправке формы
   */
  var showPopupOnSuccess = function () {
    var template = document.querySelector('#success').content;
    var templateElement = template.cloneNode(true);
    MAIN.appendChild(templateElement);

    var successPopup = document.querySelector('.success');

    document.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        successPopup.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successPopup.remove();
      }
    });
  };

  /**
   * Добавляет сообщение об ошибке отправки формы
   */
  var showPopupOnError = function () {
    var templateError = document.querySelector('#error').content;
    var error = templateError.cloneNode(true);
    MAIN.appendChild(error);

    var errorPopup = document.querySelector('.error');
    var errorButton = errorPopup.querySelector('.error__button');

    document.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        errorPopup.remove();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorPopup.remove();
      }
    });
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (evt.button === 0) {
        errorPopup.remove();
      }
    });
  };

  FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.send(new FormData(FORM), function () {
      showPopupOnSuccess();
      window.map.disable();
      window.card.delete();
      window.map.delete();
      clearForm();
      MAP_PIN_MAIN.addEventListener('click', window.map.pinClick);
    }, showPopupOnError);
  });

  RESET.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      window.map.disable();
      window.card.delete();
      window.map.delete();
      clearForm();
      window.move.resetPin();
      window.move.resetPinCoords();
      MAP_PIN_MAIN.addEventListener('click', window.map.pinClick);
    }
  });
  /**
   * Сбрасывает значения формы
   */
  var clearForm = function () {
    FORM.reset();
    CAPACITY.value = defaultValues.CAPACITY;
    window.move.resetPin();
  };
})();
