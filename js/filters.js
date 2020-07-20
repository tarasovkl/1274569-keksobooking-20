'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');

  var newPins = [];

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

      return isType;
    });
    window.map.delete();
    window.map.render(filteredPins);
  };

  window.filters = {
    onSuccess: onSuccess
  };
})();


