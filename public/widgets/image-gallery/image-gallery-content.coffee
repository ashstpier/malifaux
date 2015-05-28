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
    @widget.bind 'widget:resize', => @imageCSS()

  imageCSS: ->
    $('.image-gallery-widget img').removeClass(@cssImageClass)
    @calcImageCSS()
    $('.image-gallery-widget img').addClass(@cssImageClass)

  calcImageCSS: ->
    if @width >= @height && (@stretchImage() || @width > @widget.width())
      @cssImageClass = 'wider'
    else if @height > @width && (@stretchImage() || @height > @widget.height())
      @cssImageClass = 'taller'
    else
      @cssImageClass = ''

  render_layout: (data) ->
    img = new Image()
    img.src = "data:image/gif;base64,#{@fieldFrom(data)}"
    img.width / img.height

    @width  = img.width
    @height = img.height

    @calcImageCSS()

    if @editable()
      setTimeout (=> @setAspectRatio(1)), 0

    $("""
      <div class="image-gallery-widget">
        <img class="content #{@cssImageClass}" src="#{img.src}">
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