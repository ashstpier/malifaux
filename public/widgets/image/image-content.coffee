class window.ImageContent extends WidgetContent
  @className:   "ImageContent"
  @displayName: "Image"
  @description: "A static photograph, logo or graphic"
  @icon:        "picture"

  defaultWidth: -> 240
  defaultHeight: -> 240

  @DEFAULT_IMAGE: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

  initWithConfig: (config) ->
    @setImage(@get(config.src, ImageContent.DEFAULT_IMAGE), false)
    @_maintainAspectRatio = @get(config.maintainAspectRatio, true)

  bindEvents: (el) ->
    el.find(".picker").change (e) => @setImageFromFile(e.currentTarget.files[0])
    el.find(".content").dblclick => @openFilePicker()

  openFilePicker: ->
    picker = @el.find(".picker")
    picker.click()
    false

  setImageFromFile: (file) ->
    reader = new FileReader()
    reader.onload = (e) => @updateImage(e.target.result)
    reader.readAsDataURL(file)

  updateImage: (data) ->
    oldSrc = @src
    @setImage(data)
    Designer.history.push(this, 'setImage', oldSrc, @src)

  setImage: (data, doRedraw=true) ->
    @src = data
    @redraw() if doRedraw

  aspectRatio: ->
    if @maintainAspectRatio()
      img = new Image()
      img.src = @src
      img.width / img.height
    else
      false

  render_layout: (data) ->
    setTimeout (=> @setAspectRatio(@aspectRatio())), 0
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

  renderConfigOptions: ->
    [
      @option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")
    ]

  maintainAspectRatio: @property('_maintainAspectRatio')

  serialize: ->
    { src: @src, maintainAspectRatio: @maintainAspectRatio() }
