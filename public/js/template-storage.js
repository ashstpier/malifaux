var TemplateStore;

TemplateStore = (function() {
  var ENDPOINT_URL;

  function TemplateStore() {}

  ENDPOINT_URL = "" + TEMPLATE_ENDPOINTS[utils.environment];

  TemplateStore.all = function(cb) {
    return $.get("" + ENDPOINT_URL, function(data) {
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
      contentType: "application/json",
      dataType: 'json'
    });
  };

  TemplateStore.save = function(key, data) {
    return $.ajax({
      type: 'PUT',
      url: "" + ENDPOINT_URL + "/" + key,
      data: data,
      contentType: "application/json",
      dataType: 'json'
    });
  };

  return TemplateStore;

})();
