class TemplateStore

  ENDPOINT_URL = "#{TEMPLATE_ENDPOINTS[utils.environment]}"
  
  @all: (cb) ->
    $.get "#{ENDPOINT_URL}", (data) -> cb(data)

  @get: (key, cb) ->
    $.get "#{ENDPOINT_URL}/#{key}", (data) -> cb(data)

  @delete: (key) ->
    $.ajax({
      type: 'DELETE',
      url: "#{ENDPOINT_URL}/#{key}",
      contentType: "application/json",
      dataType: 'json'
    });

  @save: (key, data) ->
    $.ajax({ 
      type: 'PUT',
      url: "#{ENDPOINT_URL}/#{key}",
      data: data,
      contentType: "application/json",
      dataType: 'json'
    });