var LocalTemplateStore, RemoteTemplateStore;

RemoteTemplateStore = (function() {
  var ENDPOINT_HOST, ENDPOINT_URL;

  function RemoteTemplateStore() {}

  ENDPOINT_HOST = "localhost:9000";

  ENDPOINT_URL = "http://" + ENDPOINT_HOST + "/reports";

  RemoteTemplateStore.prototype.all = function(cb) {
    return $.get("" + ENDPOINT_URL + "/", function(data) {
      return cb(data);
    });
  };

  RemoteTemplateStore.prototype.get = function(key, cb) {
    return $.get("" + ENDPOINT_URL + "/" + key, function(data) {
      return cb(data);
    });
  };

  RemoteTemplateStore.prototype["delete"] = function(key) {
    return $.ajax({
      type: 'DELETE',
      url: "" + ENDPOINT_URL + "/reports/" + key,
      dataType: 'json'
    });
  };

  RemoteTemplateStore.prototype.save = function(key, data) {
    return $.ajax({
      type: 'PUT',
      url: "" + ENDPOINT_URL + "/" + key,
      data: data,
      dataType: 'json'
    });
  };

  return RemoteTemplateStore;

})();

LocalTemplateStore = (function() {
  function LocalTemplateStore() {}

  LocalTemplateStore.prototype.all = function(cb) {
    var data, templates;
    data = store.getAll();
    templates = _.map(data, function(v, k) {
      return v;
    });
    return cb(templates);
  };

  LocalTemplateStore.prototype.get = function(key, cb) {
    return cb(store.get(key));
  };

  LocalTemplateStore.prototype["delete"] = function(key) {
    return store.remove(key);
  };

  LocalTemplateStore.prototype.save = function(key, data) {
    return store.set(key, data);
  };

  return LocalTemplateStore;

})();
