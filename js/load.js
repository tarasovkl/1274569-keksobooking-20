'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var TIMEOUT_IN_MS = 10000;

  /**Загружает данные для меток на карте
   * @param  {} onSuccess
   * @param  {} onError
   */
  var getPinData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', URL);
    xhr.send();
  };
  window.load = {
    data: getPinData
  }
})();
