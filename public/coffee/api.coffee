window.API = {
  _config: null
  config: (cb) ->
    cb(@_config) if @_config
    $.get CONFIGURATION_ENDPOINTS[environment.name], (data) =>
      @_config = data
      cb(data)

  loadConfig: (cb) -> @config(-> cb())

  _students: {}
  student: (id, cb) ->
    cb(@_students[id]) if @_students[id]
    extensions = { # nasty work around for the local dev express, sorry :(
      "production" : "",
      "development" : ".json"
    }
    studentUrl = "#{STUDENT_ENDPOINTS[environment.name]}/#{id}#{extensions[environment.name]}"
    $.get studentUrl, (data) =>
      @_students[id] = data
      cb(data)

  assessmentPoints: -> @_config.assessmentPoints
  metrics:          -> @_config.data
  subjects:         -> @_config.subjects
}
