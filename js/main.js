"use strict"

var MAP = document.querySelector('.map');
var MAP_PINS = document.querySelector('.map__pins');
var OFFER_TYPE = ["palace", "flat", "house", "bungalo"];
var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var template = document.querySelector('#pin').content;
var templateButton = document.querySelector('#pin').content.querySelector('button');
var TEMPLATE_IMG = document.querySelector('#pin').content.querySelector('img');
/**
 * Возвращает случайный элемент массива
 * @param  {Array} arr
 * @return случайный элемент массива
 */
function getRandom(arr) {
  var RAND = Math.floor(Math.random() * arr.length);
  return arr[RAND];
}
/**
 * Возвращает случайное число в диапазоне
 * @param  {number} min
 * @param  {number} max
 * @return случайное число
 */
function getRandomNumber(min, max) {
  var RAND_NUMBER = min + Math.random() * (max + 1 - min);
  return Math.floor(RAND_NUMBER);
}

/**
 * Меняет порядок элементов в массиве
 * @param {Array} arr
 * @return массив
 */
function shuffleArray(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}

var Pin_Coordinate = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 600
};

var Offer_Value = {
  PRICE_MIN: 0,
  PRICE_MAX: 10000,
  ROOMS_MIN: 1,
  ROOMS_MAX: 2,
  GUESTS_MIN: 1,
  GUESTS_MAX: 3
};


/**
 * Создаёт массив объектов с данными
 * @param  {number} count
 */
var createPinData = function (count) {
  var PinDataArray = [];
  for (var i = 0; i < count; i++) {
    PinDataArray[i] = {
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      offer: {
        title: "Заголовок",
        address: "{location.x}, {location.y}",
        price: getRandomNumber(Offer_Value.PRICE_MIN, Offer_Value.PRICE_MAX),
        type: getRandom(OFFER_TYPE),
        rooms: getRandomNumber(Offer_Value.ROOMS_MIN, Offer_Value.ROOMS_MAX),
        guests: getRandomNumber(Offer_Value.GUESTS_MIN, Offer_Value.GUESTS_MAX),
        checkin: getRandom(OFFER_CHECKIN),
        checkout: getRandom(OFFER_CHECKIN),
        features: shuffleArray(OFFER_FEATURES).splice(0, getRandomNumber(0, OFFER_FEATURES.length)),
        description: "Описание",
        photos: shuffleArray(OFFER_PHOTOS).slice(0, getRandomNumber(0, OFFER_PHOTOS.length)),
      },
      location: {
        x: getRandomNumber(Pin_Coordinate.X_MIN, Pin_Coordinate.X_MAX),
        y: getRandomNumber(Pin_Coordinate.Y_MIN, Pin_Coordinate.Y_MAX)
      }
    }
  }
  return PinDataArray;
};

var allData = createPinData(8);
console.log(allData);
/**
 * Создает метки на карте
 * @param  {array} pinsData
 */
var createPin = function (pinsData) {
  for (var i = 0; i < pinsData.length; i++) {
    TEMPLATE_IMG.alt = pinsData[i].offer.title;
    TEMPLATE_IMG.src = pinsData[i].author.avatar;
    var button = templateButton.cloneNode(true);
    button.style = "left: " + pinsData[i].location.x + "px;" + "top:" + pinsData[i].location.y + "px;";
    MAP_PINS.appendChild(button);
  }
};
createPin(allData);

var TEMPLATE_CARD = document.querySelector("#card").content;
var FRAGMENT_CARD = document.createDocumentFragment();
var POPUP_TITLE = document.querySelector("#card").content.querySelector(".popup__title");
var POPUP_ADRESS = document.querySelector("#card").content.querySelector(".popup__text--address");
var POPUP_PRICE = document.querySelector("#card").content.querySelector(".popup__text--price");
var POPUP_TYPE = document.querySelector("#card").content.querySelector(".popup__type");
var POPUP_ROOMGUESTS = document.querySelector("#card").content.querySelector(".popup__text--capacity");
var POPUP_CHECKIN = document.querySelector("#card").content.querySelector(".popup__text--time");
var POPUP_DESCRIPTION = document.querySelector("#card").content.querySelector(".popup__description");
var POPUP_PHOTOS = document.querySelector("#card").content.querySelector(".popup__photos");
var POPUP_AVATAR = document.querySelector("#card").content.querySelector(".popup__avatar");
var POPUP_PHOTO = POPUP_PHOTOS.querySelector(".popup__photo");
var MAP_FILTERS = document.querySelector(".map__filters-container");

/* var CARD = TEMPLATE_CARD.cloneNode(true);
POPUP_TITLE.textContent = allData[0].offer.title;
POPUP_ADRESS.textContent = allData[0].offer.address;
POPUP_PRICE.textContent = allData[0].offer.price + "₽/ночь";
POPUP_ROOMGUESTS.textContent = allData[0].offer.rooms + " комнаты для " + allData[0].offer.guests + " гостей";
POPUP_CHECKIN.textContent = "Заезд после " + allData[0].offer.checkin + ", выезд до " + allData[0].offer.checkout;
POPUP_DESCRIPTION.textContent = allData[0].offer.description;
POPUP_AVATAR.src = allData[0].author.avatar;

if (allData[0].offer.photos.length > 1) {
  POPUP_PHOTO.src = allData[0].offer.photos[0];
  for (var i = allData[0].offer.photos.length - 1; i > 0; i--) {
    var NEW_IMG = POPUP_PHOTO.cloneNode();
    NEW_IMG.src = allData[0].offer.photos[i];
    POPUP_PHOTOS.appendChild(NEW_IMG);
  }
} else {
  POPUP_PHOTO.src = allData[0].offer.photos;
};

if (allData[0].offer.photos.length === 0) {
  POPUP_PHOTO.remove();
}

var Type = {
  BUNGALO: "Бунгало",
  FLAT: "Квартира",
  HOUSE: "Дом",
  PALACE: "Дворец"
};

POPUP_TYPE.textContent = Type[allData[0].offer.type.toUpperCase()];

var FEATURE_WIFI = document.querySelector("#card").content.querySelector(".popup__feature--wifi");
var FEATURE_DISHWASHER = document.querySelector("#card").content.querySelector(".popup__feature--dishwasher");
var FEATURE_PARKING = document.querySelector("#card").content.querySelector(".popup__feature--parking");
var FEATURE_WASHER = document.querySelector("#card").content.querySelector(".popup__feature--washer");
var FEATURE_ELEVATOR = document.querySelector("#card").content.querySelector(".popup__feature--elevator");
var FEATURE_CONDITIONER = document.querySelector("#card").content.querySelector(".popup__feature--conditioner");

if (!allData[0].offer.features.includes("wifi")) {
  FEATURE_WIFI.remove();
};

if (!allData[0].offer.features.includes("dishwasher")) {
  FEATURE_DISHWASHER.remove();
};

if (!allData[0].offer.features.includes("parking")) {
  FEATURE_PARKING.remove();
};

if (!allData[0].offer.features.includes("washer")) {
  FEATURE_WASHER.remove();
};

if (!allData[0].offer.features.includes("elevator")) {
  FEATURE_ELEVATOR.remove();
};

if (!allData[0].offer.features.includes("conditioner")) {
  FEATURE_CONDITIONER.remove();
};

TEMPLATE_CARD.appendChild(FRAGMENT_CARD);
MAP.insertBefore(TEMPLATE_CARD, MAP_FILTERS); */

var MAP_PIN_MAIN = document.querySelector(".map__pin--main");
var HEADER_INPUT = document.querySelector(".ad-form-header__input");
var FORM = document.querySelector(".ad-form");
HEADER_INPUT.disabled = true;
var FORM_INPUTS = document.querySelectorAll(".ad-form__element");
var MAP_FORM = MAP_FILTERS.querySelectorAll(".map__filter");
var MAP_FEATURE = document.querySelector(".map__features");

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
};

var onMappinClick = function (evt) {
  if (evt.button === 0) {
    enableActive();
  };
};

MAP_PIN_MAIN.addEventListener("mousedown", onMappinClick);

MAP_PIN_MAIN.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    enableActive();
  }
});

var PinSize = {
  WIDTH: 31,
  HEIGHT: 75
};

var TitleValidity = {
  MINLENGHT: 30,
  MAXLENGTH: 100
}

var FORM_ADDRESS = FORM.querySelector("#address");
var ADRESS_COORDINATES_LEFT = Number.parseInt(MAP_PIN_MAIN.style.left);
var ADRESS_COORDINATES_TOP = Number.parseInt(MAP_PIN_MAIN.style.top);
FORM_ADDRESS.value = (ADRESS_COORDINATES_LEFT + PinSize.WIDTH) + ", " + (ADRESS_COORDINATES_TOP + PinSize.HEIGHT);

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

console.log(CAPACITY_VALUES);

console.log(CAPACITY_VALUES[0].value);

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
