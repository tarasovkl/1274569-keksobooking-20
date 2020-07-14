"use strict";

(function () {
  var TitleValidity = {
    MINLENGHT: 30,
    MAXLENGTH: 100
  }
  var TITLE_INPUT = document.querySelector("#title");

  TITLE_INPUT.addEventListener("invalid", function () {
    if (TITLE_INPUT.validity.valueMissing) {
      TITLE_INPUT.setCustomValidity("Обязательное поле");
    }
    else {
      TITLE_INPUT.setCustomValidity('');
    }
  });

  TITLE_INPUT.addEventListener("input", function () {
    var TITLE_INPUT_LENGTH = TITLE_INPUT.value.length;
    if (TITLE_INPUT_LENGTH < TitleValidity.MINLENGHT) {
      TITLE_INPUT.setCustomValidity('Ещё ' + (TitleValidity.MINLENGHT - TITLE_INPUT_LENGTH) + ' симв.');
    } else if (TITLE_INPUT_LENGTH > TitleValidity.MAXLENGTH) {
      TITLE_INPUT.setCustomValidity('Удалите лишние ' + (TITLE_INPUT_LENGTH - TitleValidity.MAXLENGTH) + ' симв.')
    } else TITLE_INPUT.setCustomValidity('');
  });


  var PLACE_TYPE = document.querySelector("#type");
  var PLACE_PRICE = document.querySelector("#price");
  var TIMEIN = document.querySelector("#timein");
  var TIMEOUT = document.querySelector("#timeout");
  var ROOM_NUMBER = document.querySelector("#room_number");
  var CAPACITY = document.querySelector("#capacity");
  var CAPACITY_VALUES = CAPACITY.children;

  var Types = {
    BUNGALO: {
      price: 0,
      type: "bungalo",
      minPrice: 0
    },
    FLAT: {
      price: 1000,
      type: "flat",
      minPrice: 1000
    },
    HOUSE: {
      price: 5000,
      type: "house",
      minPrice: 5000
    },
    PALACE: {
      price: 10000,
      type: "palace",
      minPrice: 10000
    }
  };

  PLACE_PRICE.placeholder = Types.FLAT.price;

  PLACE_TYPE.addEventListener("change", function () {
    if (this.value === Types[this.value.toUpperCase()].type) {
      PLACE_PRICE.placeholder = Types[this.value.toUpperCase()].price;
      PLACE_PRICE.min = Types[this.value.toUpperCase()].minPrice;
    };
  });

  PLACE_PRICE.max = 1000000;

  TIMEIN.addEventListener("change", function () {
    TIMEOUT.value = this.value;
  });

  TIMEOUT.addEventListener("change", function () {
    TIMEIN.value = this.value;
  });

  var Values = {
    ONE_ROOM: "1",
    TWO_ROOMS: "2",
    THREE_ROOMS: "3",
    ONE_H_ROOMS: "100",
    ZERO: "0"
  };

  CAPACITY.value = Values.ONE_ROOM;
  CAPACITY_VALUES[0].disabled = true;
  CAPACITY_VALUES[1].disabled = true;
  CAPACITY_VALUES[2].disabled = false;
  CAPACITY_VALUES[3].disabled = true;

  ROOM_NUMBER.addEventListener("change", function () {
    if (this.value === Values.TWO_ROOMS) {
      CAPACITY.value = Values.TWO_ROOMS;
      CAPACITY_VALUES[0].disabled = true;
      CAPACITY_VALUES[1].disabled = false;
      CAPACITY_VALUES[2].disabled = false;
      CAPACITY_VALUES[3].disabled = true;
    };
    if (this.value === Values.ONE_ROOM) {
      CAPACITY.value = Values.ONE_ROOM;
      CAPACITY_VALUES[0].disabled = true;
      CAPACITY_VALUES[1].disabled = true;
      CAPACITY_VALUES[2].disabled = false;
      CAPACITY_VALUES[3].disabled = true;
    };
    if (this.value === Values.THREE_ROOMS) {
      CAPACITY.value = Values.THREE_ROOMS;
      CAPACITY_VALUES[0].disabled = false;
      CAPACITY_VALUES[1].disabled = false;
      CAPACITY_VALUES[2].disabled = false;
      CAPACITY_VALUES[3].disabled = true;
    };
    if (this.value === Values.ONE_H_ROOMS) {
      CAPACITY.value = Values.ZERO;
      CAPACITY_VALUES[0].disabled = true;
      CAPACITY_VALUES[1].disabled = true;
      CAPACITY_VALUES[2].disabled = true;
      CAPACITY_VALUES[3].disabled = false;
    };
  });
})();
