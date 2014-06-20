class window.ImageContent extends WidgetContent

  @DEFAULT_IMAGE: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

  constructor: (config={}) ->
    @src = @get(config.src, ImageContent.DEFAULT_IMAGE)

  bindEvents: (el) ->
    el.find(".picker").change (e) => @setImageFromFile(e.currentTarget.files[0])
    el.find(".icon").dblclick => @openFilePicker()

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
    @el.removeClass('image-blank')

  render_layout: (data) ->
    $("""
      <div class="image-widget #{if @src is ImageContent.DEFAULT_IMAGE then 'image-blank'}">
        <img class="content" src="#{@src}">
        <div class="edit">
          <a class="icon" href="#">&#43;</a>
          <input class="picker" type="file" accept="image/x-png, image/gif, image/jpeg">
        </div>
      </div>
    """)

  serialize: ->
    { src: @src }
