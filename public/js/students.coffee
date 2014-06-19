window.Students = {

  init: ->
    console.log "init"
    $.get '/', (data) ->
      console.log data
      # $('body').append "Successfully got the page."

}

$ -> Students.init()