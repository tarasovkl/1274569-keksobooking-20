"use strict"

var MAP = document.querySelector('.map');
var MAP_PINS = document.querySelector('.map__pins');
var OFFER_TYPE = ["palace", "flat", "house", "bungalo"];
var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var arr = [];
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

var PIN_COORDINATES = {
  positionX_MIN: 0,
  positionX_MAX: 1200,
  positionY_MIN: 130,
  positionY_MAX: 600
};

/**
 * Создаёт массив объектов с данными
 * @param  {number} count
 */
var createPinData = function (count) {

  for (var i = 0; i < count; i++) {
    arr[i] = {
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      offer: {
        title: "Заголовок",
        address: "{location.x}, {location.y}",
        price: getRandomNumber(3000, 6000),
        type: getRandom(OFFER_TYPE),
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 100),
        checkin: getRandom(OFFER_CHECKIN),
        checkout: getRandom(OFFER_CHECKIN),
        features: shuffleArray(OFFER_FEATURES).splice(0, getRandomNumber(0, OFFER_FEATURES.length)),
        description: "Описание",
        photos: shuffleArray(OFFER_PHOTOS).slice(0, getRandomNumber(0, OFFER_PHOTOS.length)),
      },
      location: {
        x: getRandomNumber(PIN_COORDINATES.positionX_MIN, PIN_COORDINATES.positionX_MAX),
        y: getRandomNumber(PIN_COORDINATES.positionY_MIN, PIN_COORDINATES.positionY_MAX)
      }
    }
  }
  console.log(arr);
};

createPinData(8);
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
createPin(arr);

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
POPUP_TITLE.textContent = arr[0].offer.title;
POPUP_ADRESS.textContent = arr[0].offer.address;
POPUP_PRICE.textContent = arr[0].offer.price + "₽/ночь";
POPUP_ROOMGUESTS.textContent = arr[0].offer.rooms + " комнаты для " + arr[0].offer.guests + " гостей";
POPUP_CHECKIN.textContent = "Заезд после " + arr[0].offer.checkin + ", выезд до " + arr[0].offer.checkout;
POPUP_DESCRIPTION.textContent = arr[0].offer.description;
POPUP_AVATAR.src = arr[0].author.avatar;

if (arr[0].offer.photos.length > 1) {
  POPUP_PHOTO.src = arr[0].offer.photos[0];
  for (var i = arr[0].offer.photos.length - 1; i > 0; i--) {
    var NEW_IMG = POPUP_PHOTO.cloneNode();
    NEW_IMG.src = arr[0].offer.photos[i];
    POPUP_PHOTOS.appendChild(NEW_IMG);
  }
} else {
  POPUP_PHOTO.src = arr[0].offer.photos;
};

if (arr[0].offer.photos.length === 0) {
  POPUP_PHOTO.remove();
}

if (arr[0].offer.type === "palace") {
  POPUP_TYPE.textContent = "Дворец";
} else if (arr[0].offer.type === "flat") {
  POPUP_TYPE.textContent = "Квартира";
} else if (arr[0].offer.type === "bungalo") {
  POPUP_TYPE.textContent = "Бунгало";
} else if (arr[0].offer.type === "house") {
  POPUP_TYPE.textContent = "Дом";
};


var FEATURE_WIFI = document.querySelector("#card").content.querySelector(".popup__feature--wifi");
var FEATURE_DISHWASHER = document.querySelector("#card").content.querySelector(".popup__feature--dishwasher");
var FEATURE_PARKING = document.querySelector("#card").content.querySelector(".popup__feature--parking");
var FEATURE_WASHER = document.querySelector("#card").content.querySelector(".popup__feature--washer");
var FEATURE_ELEVATOR = document.querySelector("#card").content.querySelector(".popup__feature--elevator");
var FEATURE_CONDITIONER = document.querySelector("#card").content.querySelector(".popup__feature--conditioner");

if (!arr[0].offer.features.includes("wifi")) {
  FEATURE_WIFI.remove();
};

if (!arr[0].offer.features.includes("dishwasher")) {
  FEATURE_DISHWASHER.remove();
};

if (!arr[0].offer.features.includes("parking")) {
  FEATURE_PARKING.remove();
};

if (!arr[0].offer.features.includes("washer")) {
  FEATURE_WASHER.remove();
};

if (!arr[0].offer.features.includes("elevator")) {
  FEATURE_ELEVATOR.remove();
};

if (!arr[0].offer.features.includes("conditioner")) {
  FEATURE_CONDITIONER.remove();
};

TEMPLATE_CARD.appendChild(FRAGMENT_CARD);
MAP.insertBefore(TEMPLATE_CARD, MAP_FILTERS); */





var MAP_PIN_MAIN = document.querySelector(".map__pin--main");
var HEADER_INPUT = document.querySelector(".ad-form-header__input");
var FORM = document.querySelector(".ad-form");
HEADER_INPUT.disabled = true;
var FORM_INPUTS = document.querySelectorAll(".ad-form__element");

for (var i = 0; i < FORM_INPUTS.length; i++) {
  FORM_INPUTS[i].disabled = true;
}

MAP_PIN_MAIN.addEventListener("mousedown", logMouseButton);

function logMouseButton(evt) {
  if (typeof evt === "object") {
    switch (evt.button) {
      case 0:
        MAP.classList.remove("map--faded");
        FORM.classList.remove("ad-form--disabled");
        HEADER_INPUT.disabled = false;
        for (var i = 0; i < FORM_INPUTS.length; i++) {
          FORM_INPUTS[i].disabled = false;
        };
        break;
    }
  }
};

MAP_PIN_MAIN.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    MAP.classList.remove("map--faded");
    FORM.classList.remove("ad-form--disabled");
    HEADER_INPUT.disabled = false;
    for (var i = 0; i < FORM_INPUTS.length; i++) {
      FORM_INPUTS[i].disabled = false;
    }
  }
});

var PinSize = {
  WIDTH: 31,
  HEIGHT: 80
};

var TitleValidity = {
  MINLENGHT: 30,
  MAXLENGTH: 100
}

var FORM_ADDRESS = FORM.querySelector("#address");
var ADRESS_COORDINATES_LEFT = Number.parseInt(MAP_PIN_MAIN.style.left);
var ADRESS_COORDINATES_TOP = Number.parseInt(MAP_PIN_MAIN.style.top);
FORM_ADDRESS.value = (ADRESS_COORDINATES_LEFT + PinSize.WIDTH) + ", " + (ADRESS_COORDINATES_TOP + PinSize.HEIGHT);

var TITLE_INPUT = document.getElementById("title");

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


var PLACE_TYPE = document.getElementById("type");
var PLACE_PRICE = document.getElementById("price");
console.log(PLACE_TYPE);


PLACE_TYPE.addEventListener("change", function() {

});
