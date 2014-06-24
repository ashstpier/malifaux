class TemplateStore

  ENDPOINT_HOST = "localhost:9000" 
  ENDPOINT_URL = "http://#{ENDPOINT_HOST}/reports"
  
  @all: (cb) ->
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