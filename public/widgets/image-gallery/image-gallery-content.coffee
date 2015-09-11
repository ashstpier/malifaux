class window.ImageGalleryContent extends WidgetContent
  @className: "ImageGalleryContent"
  @displayName: "Dynamic Images"
  @description: "A dynamic photograph, logo or graphic"
  @icon: "picture"

  editable: -> @widget.currentMode is 'layout'

  initWithConfig: (config) ->
    @_field = @get(config.field, Object.keys(@images())[0])
    @_stretchImage = @get(config.stretchImage, true)

  bindEvents: (el) ->
    @widget.bind 'widget:resize', => @imageSize()

  imageSize: ->
    @calcImageSize()
    $('.image-gallery-widget img').attr('width': @width + 'px').attr('height': @height + 'px')

  calcImageSize: ->
    if @width >= @height
      if @widget.width() < @defaultWidth  || @stretchImage()
        @height = Math.round(@height * (@widget.width()/@width))
        @width = @widget.width()
    else
      if @widget.height() < @defaultHeight || @stretchImage()
        @width = Math.round(@width * (@widget.height()/@height))
        @height = @widget.height()

  render_layout: (data) ->
    img = new Image()
    img.src = "data:image/gif;base64,#{@fieldFrom(data)}"
    img.width / img.height

    @defaultWidth = @width  = img.width
    @defaultHeight = @height = img.height

    @calcImageSize()

    if @editable()
      setTimeout (=> @setAspectRatio(1)), 0

    $("""
      <div class="image-gallery-widget">
        <img class="content" width="#{@width}px" height="#{@height}px" src="#{img.src}">
      </div>
    """)

  renderConfigOptions: ->
    [
      @option('checkbox', 'stretchImage', "Stretch Image")
      @option('select', 'field', "Field",
        options: @images(), hint: "This is the gallery image you would like to be merged, the image shown is only a placeholder of the final output.")
    ]

  stretchImage: @property('_stretchImage')

  fieldFrom: (data) ->
    data = data['images']?[key] for key in @_field.split('.')

  field: @property('_field')

  serialize: ->
    {field: @_field, stretchImage: @stretchImage()}
