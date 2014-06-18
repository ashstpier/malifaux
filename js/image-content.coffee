class window.ImageContent

  constructor: (config={}) ->
    @src = if config.src? then config.src else "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

  bindEvents: ->
    el = @el
    @el.find(".picker").change (e) ->
      for file in e.currentTarget.files
        reader = new FileReader()
        reader.onload = (e) ->
          el.find(".content").attr('src', e.target.result)
        reader.readAsDataURL(file)

    @el.find(".icon").click (e) ->
      picker = el.find(".picker")
      picker.click()
      return false

  render: (mode) ->
    @el = $("""
      <div class="image-widget">
        <img class="content" src="#{@src}">
        <div class="edit">
          <a class="icon" href="#">&#43;</a>
          <input class="picker" type="file" accept="image/x-png, image/gif, image/jpeg">
        </div>
      </div>
    """)
    @bindEvents()
    @el

  serialize: -> 
    console.log("hello world") 
    { src: @el.find(".content").attr("src") }