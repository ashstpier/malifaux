window.API = {
  _config: null
  config: (cb) ->
    cb(@_config) if @_config
    $.get "/configuration.json", (data) =>
      @_config = data
      cb(data)

  loadConfig: (cb) -> @config(-> cb())

  _students: {}
  student: (id, cb) ->
    cb(@_students[id]) if @_students[id]
    $.get "/#{id}.json", (data) =>
      @_students[id] = data
      cb(data)

  assessmentPoints: -> @_config.assessmentPoints
}