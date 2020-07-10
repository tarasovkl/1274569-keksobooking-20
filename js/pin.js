"use strict";

(function () {
  var OFFER_TYPE = ["palace", "flat", "house", "bungalo"];
  var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
  var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
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

  window.pin = {
    data: allData
  }
})();
