class TemplateStore

  ENDPOINT_HOST = window.location.host
  ENDPOINT_URL = "http://#{ENDPOINT_HOST}/reports"
  
  @all: (cb) ->
    console.log ENDPOINT_HOST
    $.get "#{ENDPOINT_URL}/", (data) -> cb(data)

  @get: (key, cb) ->
    $.get "#{ENDPOINT_URL}/#{key}", (data) -> cb(data)

  @delete: (key) ->
    $.ajax({ 
      type: 'DELETE',
      url: "#{ENDPOINT_URL}/#{key}",
      dataType: 'json'
    });

  @save: (key, data) ->
    console.log 
    $.ajax({ 
      type: 'PUT',
      url: "#{ENDPOINT_URL}/#{key}",
      data: data
      dataType: 'json'
    });