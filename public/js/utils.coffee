window.utils = {
  guid: ->
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
      r = Math.random() * 16 | 0
      v = if c is 'x' then r else (r & 0x3|0x8)
      v.toString(16)

  querystring: (name) ->
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
    results = regex.exec(location.search);
    if results == null then "" else decodeURIComponent(results[1].replace(/\+/g, " "))

  escape: (str) ->
    str.replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")

  loadCSS: (path) ->
    $('head').append("""<link rel="stylesheet" type="text/css" href="#{path}">""")

  loadCoffeeScript: (path, cb=null) ->
    CoffeeScript.load(path, cb)
}