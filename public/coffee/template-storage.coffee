class RemoteTemplateStore

  ENDPOINT_HOST = "localhost:9000" 
  # "http://localhost:9000/ccr2s/api/parent-reports/report/
  ENDPOINT_URL = "http://#{ENDPOINT_HOST}/reports"
  # ENDPOINT_URL = "ccr2s/api/parent-reports/"

  all: (cb) ->
    $.get "#{ENDPOINT_URL}/", (data) -> cb(data)

  get: (key, cb) ->
    $.get "#{ENDPOINT_URL}/#{key}", (data) -> cb(data)

  delete: (key) ->
    $.ajax({ 
      type: 'DELETE',
      url: "#{ENDPOINT_URL}/reports/#{key}",
      dataType: 'json'
    });

  save: (key, data) ->
    $.ajax({ 
      type: 'PUT',
      url: "#{ENDPOINT_URL}/#{key}",
      data: data
      dataType: 'json'
    });

class LocalTemplateStore

  all: (cb) ->
    data = store.getAll()
    templates = _.map data, (v, k) -> v
    cb(templates)

  get: (key, cb) ->
    cb(store.get(key))

  delete: (key) ->
    store.remove(key)

  save: (key, data) ->
    store.set(key, data)