(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  /**
   * Отправляет данные на сервер
   * @param  {Object} data
   * @param  {Function} onSuccess
   * @param  {Function} onError
   */
  var sendFormData = function (data, onSuccess, onError) {
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

    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.upload = {
    send: sendFormData
  };
})();
