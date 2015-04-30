class window.ImageGalleryContent extends WidgetContent
  @className:   "ImageGalleryContent"
  @displayName: "Image Gallery"
  @description: "A dynamic photograph, logo or graphic"
  @icon:        "picture"

  initWithConfig: (config) ->
    @_field = @get(config.field, Object.keys(@images())[0])
    @_maintainAspectRatio = @get(config.maintainAspectRatio, true)

  render_layout: (data) ->
    setTimeout (=> @setAspectRatio(@aspectRatio())), 0
    $("""
      <div class="image-widget">
        <img class="content" src="data:image/gif;base64,#{@fieldFrom(data)}">
        <input class="picker" type="file" accept="image/png, image/jpeg">
      </div>
    """)

  renderConfigOptions: ->
    [
      @option('checkbox', 'maintainAspectRatio', "Maintain Aspect Ratio")
      @option('select', 'field', "Field", options: @images(), hint: "This is the gallery image you would like to be merged, the image shown is only a placeholder of the final output.")
    ]

  fieldFrom: (data) ->
    data = data?['images'][key] for key in @_field.split('.')

  aspectRatio: ->
    if @maintainAspectRatio()
      img = new Image()
      img.src = "data:image/gif;base64,#{@fieldFrom(data)}"
      img.width / img.height
    else
      false

  field: @property('_field')

  maintainAspectRatio: @property('_maintainAspectRatio')

  serialize: ->
    {field: @_field, maintainAspectRatio: @maintainAspectRatio()}
