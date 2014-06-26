var TemplateStore;

TemplateStore = (function() {
  var ENDPOINT_HOST, ENDPOINT_URL;

  function TemplateStore() {}

  ENDPOINT_HOST = window.location.host;

  ENDPOINT_URL = "http://" + ENDPOINT_HOST + "/reports";

  TemplateStore.all = function(cb) {
    console.log(ENDPOINT_HOST);
    return $.get("" + ENDPOINT_URL + "/", function(data) {
      return cb(data);
    });
  };

  TemplateStore.get = function(key, cb) {
    return $.get("" + ENDPOINT_URL + "/" + key, function(data) {
      return cb(data);
    });
  };

  TemplateStore["delete"] = function(key) {
    return $.ajax({
      type: 'DELETE',
      url: "" + ENDPOINT_URL + "/" + key,
      dataType: 'json'
    });
  };

  TemplateStore.save = function(key, data) {
    console.log;
    return $.ajax({
      type: 'PUT',
      url: "" + ENDPOINT_URL + "/" + key,
      data: data,
      dataType: 'json'
    });
  };

  return TemplateStore;

})();
