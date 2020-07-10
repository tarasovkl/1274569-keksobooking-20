"use strict";

(function () {
  var ALLDATA = window.pin.data;
  var MAP = document.querySelector('.map');
  var MAP_FILTERS = document.querySelector(".map__filters-container");
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


 var CARD = TEMPLATE_CARD.cloneNode(true);
  POPUP_TITLE.textContent = ALLDATA[0].offer.title;
  POPUP_ADRESS.textContent = ALLDATA[0].offer.address;
  POPUP_PRICE.textContent = ALLDATA[0].offer.price + "₽/ночь";
  POPUP_ROOMGUESTS.textContent = ALLDATA[0].offer.rooms + " комнаты для " + ALLDATA[0].offer.guests + " гостей";
  POPUP_CHECKIN.textContent = "Заезд после " + ALLDATA[0].offer.checkin + ", выезд до " + ALLDATA[0].offer.checkout;
  POPUP_DESCRIPTION.textContent = ALLDATA[0].offer.description;
  POPUP_AVATAR.src = ALLDATA[0].author.avatar;

  if (ALLDATA[0].offer.photos.length > 1) {
    POPUP_PHOTO.src = ALLDATA[0].offer.photos[0];
    for (var i = ALLDATA[0].offer.photos.length - 1; i > 0; i--) {
      var NEW_IMG = POPUP_PHOTO.cloneNode();
      NEW_IMG.src = ALLDATA[0].offer.photos[i];
      POPUP_PHOTOS.appendChild(NEW_IMG);
    }
  } else {
    POPUP_PHOTO.src = ALLDATA[0].offer.photos;
  };

  if (ALLDATA[0].offer.photos.length === 0) {
    POPUP_PHOTO.remove();
  }

  var Type = {
    BUNGALO: "Бунгало",
    FLAT: "Квартира",
    HOUSE: "Дом",
    PALACE: "Дворец"
  };

  POPUP_TYPE.textContent = Type[ALLDATA[0].offer.type.toUpperCase()];

  var FEATURE_WIFI = document.querySelector("#card").content.querySelector(".popup__feature--wifi");
  var FEATURE_DISHWASHER = document.querySelector("#card").content.querySelector(".popup__feature--dishwasher");
  var FEATURE_PARKING = document.querySelector("#card").content.querySelector(".popup__feature--parking");
  var FEATURE_WASHER = document.querySelector("#card").content.querySelector(".popup__feature--washer");
  var FEATURE_ELEVATOR = document.querySelector("#card").content.querySelector(".popup__feature--elevator");
  var FEATURE_CONDITIONER = document.querySelector("#card").content.querySelector(".popup__feature--conditioner");

  if (!ALLDATA[0].offer.features.includes("wifi")) {
    FEATURE_WIFI.remove();
  };

  if (!ALLDATA[0].offer.features.includes("dishwasher")) {
    FEATURE_DISHWASHER.remove();
  };

  if (!ALLDATA[0].offer.features.includes("parking")) {
    FEATURE_PARKING.remove();
  };

  if (!ALLDATA[0].offer.features.includes("washer")) {
    FEATURE_WASHER.remove();
  };

  if (!ALLDATA[0].offer.features.includes("elevator")) {
    FEATURE_ELEVATOR.remove();
  };

  if (!ALLDATA[0].offer.features.includes("conditioner")) {
    FEATURE_CONDITIONER.remove();
  };

  TEMPLATE_CARD.appendChild(FRAGMENT_CARD);
  MAP.insertBefore(TEMPLATE_CARD, MAP_FILTERS);
})();
