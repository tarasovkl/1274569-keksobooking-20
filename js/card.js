"use strict";

(function () {
  var ALLDATA = window.pin.data;
  var MAP = document.querySelector('.map');
  var MAP_FILTERS = document.querySelector(".map__filters-container");
  var TEMPLATE_CARD = document.querySelector("#card").content;
  var CARD = TEMPLATE_CARD.cloneNode(true);
  var POPUP = CARD.querySelector('.map__card');
  var POPUP_TITLE = CARD.querySelector(".popup__title");
  var POPUP_ADRESS = CARD.querySelector(".popup__text--address");
  var POPUP_PRICE = CARD.querySelector(".popup__text--price");
  var POPUP_TYPE = CARD.querySelector(".popup__type");
  var POPUP_ROOMGUESTS = CARD.querySelector(".popup__text--capacity");
  var POPUP_CHECKIN = CARD.querySelector(".popup__text--time");
  var POPUP_DESCRIPTION = CARD.querySelector(".popup__description");
  var POPUP_PHOTOS = CARD.querySelector(".popup__photos");
  var POPUP_AVATAR = CARD.querySelector(".popup__avatar");
  var POPUP_PHOTO = POPUP_PHOTOS.querySelector(".popup__photo");
  var POPUP_CLOSE = CARD.querySelector('.popup__close');
  var FEATURE_WIFI = CARD.querySelector(".popup__feature--wifi");
  var FEATURE_DISHWASHER = CARD.querySelector(".popup__feature--dishwasher");
  var FEATURE_PARKING = CARD.querySelector(".popup__feature--parking");
  var FEATURE_WASHER = CARD.querySelector(".popup__feature--washer");
  var FEATURE_ELEVATOR = CARD.querySelector(".popup__feature--elevator");
  var FEATURE_CONDITIONER = CARD.querySelector(".popup__feature--conditioner");
  console.log()

  var Type = {
    BUNGALO: "Бунгало",
    FLAT: "Квартира",
    HOUSE: "Дом",
    PALACE: "Дворец"
  };

  var FRAGMENT = document.createDocumentFragment();
  var createPinsData = function (pinsData) {

    pinsData.forEach(function (item) {
      POPUP_TITLE.textContent = item.offer.title;
      POPUP_ADRESS.textContent = item.offer.address;
      POPUP_PRICE.textContent = item.offer.price + "₽/ночь";
      POPUP_ROOMGUESTS.textContent = item.offer.rooms + " комнаты для " + item.offer.guests + " гостей";
      POPUP_CHECKIN.textContent = "Заезд после " + item.offer.checkin + ", выезд до " + item.offer.checkout;
      POPUP_DESCRIPTION.textContent = item.offer.description;
      POPUP_AVATAR.src = item.author.avatar;
      if (item.offer.photos.length > 1) {
        POPUP_PHOTO.src = item.offer.photos[0];
        for (var i = 1; i > item.offer.photos.length; i++) {
          var NEW_IMG = POPUP_PHOTO.cloneNode();
          NEW_IMG.src = item.offer.photos[i];
          POPUP_PHOTOS.appendChild(NEW_IMG);
        }
      } else {
        POPUP_PHOTO.src = item.offer.photos;
      };

      if (item.offer.photos.length === 0) {
        POPUP_PHOTO.remove();
      }


      POPUP_TYPE.textContent = Type[item.offer.type.toUpperCase()];

      if (!item.offer.features.includes("wifi")) {
        FEATURE_WIFI.remove();
      };

      if (!item.offer.features.includes("dishwasher")) {
        FEATURE_DISHWASHER.remove();
      };

      if (!item.offer.features.includes("parking")) {
        FEATURE_PARKING.remove();
      };

      if (!item.offer.features.includes("washer")) {
        FEATURE_WASHER.remove();
      };

      if (!item.offer.features.includes("elevator")) {
        FEATURE_ELEVATOR.remove();
      };

      if (!item.offer.features.includes("conditioner")) {
        FEATURE_CONDITIONER.remove();
      };
      var POPUP = CARD.cloneNode(true);
      FRAGMENT.appendChild(POPUP);


    });
  };
  var CARDS = FRAGMENT.children;

  POPUP_CLOSE.addEventListener('click', function (evt) {
    if (evt.button === 0) {
      var MAP_CARD = document.querySelector('.map__card');
      MAP_CARD.remove();
    }
  });

  POPUP_CLOSE.addEventListener('click', function (evt) {
    if (evt.key === 'enter') {
      var MAP_CARD = document.querySelector('.map__card');
      MAP_CARD.remove();
    }
  });


  window.card = {
    popup: CARD,
    allCards: CARDS,
    createData: createPinsData
  }
})();
