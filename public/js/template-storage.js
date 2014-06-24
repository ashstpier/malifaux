var LocalTemplateStore, RemoteTemplateStore;

RemoteTemplateStore = (function() {
  function RemoteTemplateStore() {}

  RemoteTemplateStore.prototype.all = function(cb) {
    return console.log("all");
  };

  RemoteTemplateStore.prototype.get = function(key, cb) {
    return console.log("get");
  };

  RemoteTemplateStore.prototype["delete"] = function(key) {
    return console.log("delete");
  };

  RemoteTemplateStore.prototype.save = function(key, data) {
    return console.log("save");
  };

  return RemoteTemplateStore;

})();

LocalTemplateStore = (function() {
  function LocalTemplateStore() {}

  LocalTemplateStore.prototype.all = function(cb) {
    return cb(store.getAll());
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
