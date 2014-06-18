class window.ImageContent

  @DEFAULT_IMAGE: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

  constructor: (config={}) ->
    @src = if config.src? then config.src else ImageContent.DEFAULT_IMAGE

  bindEvents: ->
    @el.find(".picker").change (e) => @setImageFromFile(e.currentTarget.files[0])
    @el.find(".icon").dblclick => @openFilePicker()

  openFilePicker: ->
    picker = @el.find(".picker")
    picker.click()
    return false

  setImageFromFile: (file) ->
    reader = new FileReader()
    reader.onload = (e) => @setImage(e.target.result)
    reader.readAsDataURL(file)

  setImage: (data) ->
    @src = data
    @el.find(".content").attr('src', @src)

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
    { src: @src }
