window.Students = {

  init: ->
    $.get '/', (data) ->
      # $('body').append "Successfully got the page."

}

$ -> Students.init()