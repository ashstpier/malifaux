class RemoteTemplateStore

  all: (cb) ->
    console.log "all"

  get: (key, cb) ->
    console.log "get"

  delete: (key) ->
    console.log "delete"

  save: (key, data) ->
    console.log "save"

class LocalTemplateStore

  all: (cb) ->
    cb(store.getAll())

  get: (key, cb) ->
    cb(store.get(key))

  delete: (key) ->
    store.remove(key)

  save: (key, data) ->
    store.set(key, data)