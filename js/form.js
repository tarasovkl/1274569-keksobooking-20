'use strict';

(function () {

  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var titleInput = document.querySelector('#title');
  var placeType = document.querySelector('#type');
  var placePrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var reset = document.querySelector('.ad-form__reset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');

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
    MIN_PRICE: 1000,
    CAPACITY: 1
  };

  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', function () {
    var titleInputLength = titleInput.value.length;
    if (titleInputLength < TitleValidity.MINLENGHT) {
      titleInput.setCustomValidity('Ещё ' + (TitleValidity.MINLENGHT - titleInputLength) + ' симв.');
    } else if (titleInputLength > TitleValidity.MAXLENGTH) {
      titleInput.setCustomValidity('Удалите лишние ' + (titleInputLength - TitleValidity.MAXLENGTH) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  placePrice.placeholder = Types.FLAT.price;
  placePrice.max = defaultValues.MAX_PRICE;
  placePrice.min = defaultValues.MIN_PRICE;

  placeType.addEventListener('change', function () {
    if (placeType.value === Types[placeType.value.toUpperCase()].type) {
      placePrice.placeholder = Types[placeType.value.toUpperCase()].price;
      placePrice.min = Types[placeType.value.toUpperCase()].minPrice;
    }
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  capacity.value = roomsForGuests[1];

  roomNumber.addEventListener('change', function () {
    roomNumber.setCustomValidity('');
    if (!roomsForGuests[roomNumber.value].includes(capacity.value)) {
      roomNumber.setCustomValidity('Количество комнат не должно быть меньше количества мест (100 комнат - не для гостей)');
    } else {
      capacity.setCustomValidity('');
    }
  });

  capacity.addEventListener('change', function () {
    capacity.setCustomValidity('');
    if (!roomsForGuests[roomNumber.value].includes(capacity.value)) {
      capacity.setCustomValidity('Количество мест не должно превышать количество комнат (100 комнат - не для гостей)');
    } else {
      roomNumber.setCustomValidity('');
    }
  });

  var template = document.querySelector('#success').content;
  /**
   * Добавляет сообщение об отправке формы
   */
  var showPopupOnSuccess = function () {
    var templateElement = template.cloneNode(true);
    main.appendChild(templateElement);
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

  var templateError = document.querySelector('#error').content;
  /**
   * Добавляет сообщение об ошибке отправки формы
   */
  var showPopupOnError = function () {
    var error = templateError.cloneNode(true);
    main.appendChild(error);
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(form), function () {
      showPopupOnSuccess();
      window.map.disable();
      window.card.delete();
      window.map.delete();
      clearForm();
      mapPinMain.addEventListener('mousedown', window.map.pinClick);
    }, showPopupOnError);
  });

  reset.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      window.map.disable();
      window.card.delete();
      window.map.delete();
      clearForm();
      window.move.resetPin();
      window.move.resetPinCoords();
      mapPinMain.addEventListener('mousedown', window.map.pinClick);
    }
  });
  /**
   * Сбрасывает значения формы
   */
  var clearForm = function () {
    form.reset();
    mapFilters.reset();
    capacity.value = defaultValues.CAPACITY;
    window.move.resetPin();
  };
})();
