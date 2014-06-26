class TemplateStore

  ENDPOINT_PATH = if window.location.hostname is "localhost" then TEMPLATE_ENDPOINTS.development else TEMPLATE_ENDPOINTS.production
  ENDPOINT_URL = "http://#{window.location.host}/#{ENDPOINT_PATH}"
  
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