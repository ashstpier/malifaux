window.Report = {

  init: ->
    studentid = utils.querystring("studentid")
    $.get "#{studentid}.json", (data) ->
      $('body').append(JSON.stringify(data))
}

$ -> Report.init()