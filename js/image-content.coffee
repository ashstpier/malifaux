class window.ImageContent

  bindEvents: ->
    @el.click -> console.log "Click"

  render: (mode) ->
    @el = $("""<a class="browseimage" href="#">&#43;</a>""")
    @bindEvents()
    @el


# """<img src="http://sussexcareers.files.wordpress.com/2013/01/ark_schools_square.jpg" width="100%" height="100%">"""
