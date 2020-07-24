'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var filters = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRoom = document.querySelector('#housing-rooms');
  var houseGuest = document.querySelector('#housing-guests');
  var housePrice = document.querySelector('#housing-price');
  var houseFeature = document.querySelector('#housing-features');
  var newPins = [];
  var PriceValue = {
    LOW: 10000,
    HIGH: 50000
  };
  /**
   * загрузка данных с сервера
   * @param  {Array} data - массив с данными
   */
  var onSuccess = function (data) {
    newPins = data;
    window.map.render(data.slice(0, MAX_PIN_COUNT));
  };

  filters.addEventListener('change', window.debounce.delay(function () {
    updatePins();
  }));


  /**
   * фильтрация пинов
   */
  var updatePins = function () {
    var filteredPins = newPins.filter(function (pin) {
      if (houseType.value === 'any') {
        var isType = true;
      } else {
        isType = houseType.value === pin.offer.type;
      }
      if (houseRoom.value === 'any') {
        var isRoom = true;
      } else {
        isRoom = houseRoom.value === pin.offer.rooms.toString();
      }
      if (houseGuest.value === 'any') {
        var isGuest = true;
      } else {
        isGuest = houseGuest.value === pin.offer.guests.toString();
      }
      if (housePrice.value === 'any') {
        var isPrice = true;
      } else if (housePrice.value === 'low') {
        isPrice = PriceValue.LOW > pin.offer.price;
      } else if (housePrice.value === 'middle') {
        isPrice = PriceValue.LOW <= pin.offer.price && pin.offer.price <= PriceValue.HIGH;
      } else if (housePrice.value === 'high') {
        isPrice = PriceValue.HIGH < pin.offer.price;
      }

      var checkedFeatures = houseFeature.querySelectorAll('input[name="features"]:checked');
      var checkedValues = Array.from(checkedFeatures).map(function (feature) {
        return feature.value;
      });
      var matchedFeatures = checkedValues.filter(function (feature) {
        return pin.offer.features.includes(feature);
      });

      if (!checkedFeatures.length) {
        var isFeature = true;
      } else {
        isFeature = matchedFeatures.length === checkedValues.length;
      }
      return isType && isRoom && isGuest && isPrice && isFeature;
    });
    window.map.delete();
    window.map.render(filteredPins.slice(0, MAX_PIN_COUNT));
  };

  window.filters = {
    onSuccess: onSuccess
  };
})();


