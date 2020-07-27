'use strict';

(function () {
  /**
  * Возвращает случайный элемент массива
  * @param  {Array} arr
  * @return {RAND} случайный элемент массива
  */
  function getRandom(arr) {
    var RAND = Math.floor(Math.random() * arr.length);
    return arr[RAND];
  }
  /**
   * Возвращает случайное число в диапазоне
   * @param  {number} min
   * @param  {number} max
   * @return {RAND_NUMBER} случайное число
   */
  function getRandomNumber(min, max) {
    var RAND_NUMBER = min + Math.random() * (max + 1 - min);
    return Math.floor(RAND_NUMBER);
  }

  /**
   * Меняет порядок элементов в массиве
   * @param {Array} arr
   * @return {arr} массив
   */
  function shuffleArray(arr) {
    var i;
    var x;
    var j;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }
})();
