class window.ImageContent extends WidgetContent

  @displayName: "Image"
  @description: "A static photograph, logo or graphic"
  @icon:        "picture"

  defaultWidth: -> 240
  defaultHeight: -> 240

  @DEFAULT_IMAGE: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

  constructor: (config={}) ->
    @src = @get(config.src, ImageContent.DEFAULT_IMAGE)

  bindEvents: (el) ->
    el.find(".picker").change (e) => @setImageFromFile(e.currentTarget.files[0])
    el.find(".content").dblclick => @openFilePicker()

  openFilePicker: ->
    picker = @el.find(".picker")
    picker.click()
    false

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
        <input class="picker" type="file" accept="image/png, image/gif, image/jpeg">
      </div>
    """)

  render_edit: (data) ->
    node = @render_layout(data)
    @bindEvents(node)
    node

  serialize: ->
    { src: @src }


