'use strict';

(function () {
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
    window.map.render(data);
  };

  filters.addEventListener('change', function () {
    updatePins();
  });


  /**
   * фильтрация пинов
   */
  var updatePins = function () {
    var filteredPins = newPins.filter(function (pin) {
      if (houseType.value === 'any') {
        var isType = true;
      } else {
        var isType = houseType.value === pin.offer.type;
      };
      if (houseRoom.value === 'any') {
        var isRoom = true;
      } else {
        var isRoom = houseRoom.value === pin.offer.rooms.toString();
      };
      if (houseGuest.value === 'any') {
        var isGuest = true;
      } else {
        var isGuest = houseGuest.value === pin.offer.guests.toString();
      };
      if (housePrice.value === 'any') {
        var isPrice = true;
      } else if (housePrice.value === 'low') {
        var isPrice = PriceValue.LOW > pin.offer.price;
      } else if (housePrice.value === 'middle') {
        var isPrice = PriceValue.LOW <= pin.offer.price && pin.offer.price <= PriceValue.HIGH;
      } else if (housePrice.value === 'high') {
        var isPrice = PriceValue.HIGH < pin.offer.price;
      };

      var checkedFeatures = houseFeature.querySelectorAll('input[name="features"]:checked');
      var checkedValues = Array.from(checkedFeatures).map(function (feature) {
        return feature.value;
      });
      var matchedFeatures = checkedValues.filter(function (feature) {
        return pin.offer.features.includes(feature);
      })

      if (!checkedFeatures.length) {
        var isFeature = true;
      } else {
        var isFeature = matchedFeatures.length === checkedValues.length;
      };
      return isType && isRoom && isGuest && isPrice && isFeature;
    });
    window.map.delete();
    window.map.render(filteredPins);
  };

  window.filters = {
    onSuccess: onSuccess
  };
})();


