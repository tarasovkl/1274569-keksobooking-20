'use strict';
(function () {
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };
  var TIMEOUT_IN_MS = 10000;
  var SUCCESS_CODE = 200;
  /**
   * Загружает данные для меток на карте
   * @param  {Object} xhr
   * @param  {Function} onSuccess
   * @param  {Function} onError
   */
  var newXhr = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_CODE:
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
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    newXhr(xhr, onSuccess, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    newXhr(xhr, onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.load = {
    download: load,
    upload: upload
  };
})();
