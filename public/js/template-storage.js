var TemplateStore;

TemplateStore = (function() {
  var ENDPOINT_PATH, ENDPOINT_URL;

  function TemplateStore() {}

  ENDPOINT_PATH = window.location.hostname === "localhost" ? TEMPLATE_ENDPOINTS.development : TEMPLATE_ENDPOINTS.production;

  ENDPOINT_URL = "http://" + window.location.host + "/" + ENDPOINT_PATH;

  TemplateStore.all = function(cb) {
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
