class window.ImageContent extends WidgetContent
  @className:   "ImageContent"
  @displayName: "Image"
  @description: "A static photograph, logo or graphic"
  @icon:        "picture"

  defaultWidth: -> 240
  defaultHeight: -> 240

  @DEFAULT_IMAGE: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  @DEFAULT_ASPECT_RATIO: 1

  initWithConfig: (config) ->
    @setImage(@get(config.src, ImageContent.DEFAULT_IMAGE), false)
    @_maintainAspectRatio = $.extend({}, ImageContent.DEFAULT_ASPECT_RATIO, @get(config.maintainAspectRatio, true))

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
    Designer.history.push(this, 'setImage', oldSrc, @src, Designer.template.currentPageNumber)

  setImage: (data, doRedraw=true) ->
    @src = data
    @maybeWarnAboutGif()
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
        <input class="picker" type="file" accept="image/png, image/jpeg">
      </div>
    """)

  render_edit: (data) ->
    node = @render_layout(data)
    @bindEvents(node)
    node

  render_display: (data) ->
    $("""
      <div class="image-widget">
        <img class="content" src="#{@src}">
      </div>
    """)

  renderConfigOptions: ->
    [
      @option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")
    ]

  maintainAspectRatio: @property('_maintainAspectRatio')

  maybeWarnAboutGif: ->
    isGif = @src and @src isnt ImageContent.DEFAULT_IMAGE and @src.indexOf("image/gif;") > -1
    if isGif and @widget.currentMode is 'layout'
      delay 1000, ->
        alert """
          Your template contains one or more GIF images.

          GIF files are not currently supported and may not display correctly when printed.

          Please replace all GIF images with alternatives in either JPG or PNG format.
        """

  serialize: ->
    { src: @src, maintainAspectRatio: @maintainAspectRatio() }
