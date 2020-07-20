"use strict";

(function () {
  var MAP = document.querySelector('.map');
  var MAP_FILTERS = document.querySelector(".map__filters-container");
  console.log()

  var Type = {
    BUNGALO: "Бунгало",
    FLAT: "Квартира",
    HOUSE: "Дом",
    PALACE: "Дворец"
  };

  /**
   * Создает карточку объявления
   * @param  {object} card
   */
  var createCardElement = function (cardData) {
    var temlateCard = document.querySelector("#card").content;
    var card = temlateCard.cloneNode(true);
    var popupTitle = card.querySelector(".popup__title");
    var popupAdress = card.querySelector(".popup__text--address");
    var popupPrice = card.querySelector(".popup__text--price");
    var popupType = card.querySelector(".popup__type");
    var popupRoomGuests = card.querySelector(".popup__text--capacity");
    var popupCheckIn = card.querySelector(".popup__text--time");
    var popupDescription = card.querySelector(".popup__description");
    var popupPhotos = card.querySelector(".popup__photos");
    var popupAvatar = card.querySelector(".popup__avatar");
    var popupPhoto = popupPhotos.querySelector(".popup__photo");
    var popupClose = card.querySelector('.popup__close');
    var featureWifi = card.querySelector(".popup__feature--wifi");
    var featureDishwasher = card.querySelector(".popup__feature--dishwasher");
    var featureParking = card.querySelector(".popup__feature--parking");
    var featureWasher = card.querySelector(".popup__feature--washer");
    var featureElevator = card.querySelector(".popup__feature--elevator");
    var featureConditioner = card.querySelector(".popup__feature--conditioner");
    popupTitle.textContent = cardData.offer.title;
    popupAdress.textContent = cardData.offer.address;
    popupPrice.textContent = cardData.offer.price + "₽/ночь";
    popupRoomGuests.textContent = cardData.offer.rooms + " комнаты для " + cardData.offer.guests + " гостей";
    popupCheckIn.textContent = "Заезд после " + cardData.offer.checkin + ", выезд до " + cardData.offer.checkout;
    popupDescription.textContent = cardData.offer.description;
    popupAvatar.src = cardData.author.avatar;

    if (cardData.offer.photos.length > 1) {
      popupPhoto.src = cardData.offer.photos[0];
      for (var i = 1; i > cardData.offer.photos.length; i++) {
        var newImg = popupPhoto.cloneNode();
        newImg.src = cardData.offer.photos[i];
        popupPhotos.appendChild(newImg);
      }
    } else {
      popupPhoto.src = cardData.offer.photos;
    };

    if (cardData.offer.photos.length === 0) {
      popupPhoto.remove();
    }

    popupType.textContent = Type[cardData.offer.type.toUpperCase()];

    if (!cardData.offer.features.includes("wifi")) {
      featureWifi.remove();
    };

    if (!cardData.offer.features.includes("dishwasher")) {
      featureDishwasher.remove();
    };

    if (!cardData.offer.features.includes("parking")) {
      featureParking.remove();
    };

    if (!cardData.offer.features.includes("washer")) {
      featureWasher.remove();
    };

    if (!cardData.offer.features.includes("elevator")) {
      featureElevator.remove();
    };

    if (!cardData.offer.features.includes("conditioner")) {
      featureConditioner.remove();
    };

    popupClose.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        var mapCard = document.querySelector('.map__card');
        mapCard.remove();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removeCardElement();
      }
    });

    MAP.insertBefore(card, MAP_FILTERS);
  };

  /**
   * Удаляет карточку объявления
   */
  var removeCardElement = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    create: createCardElement,
    delete: removeCardElement
  };
})();
