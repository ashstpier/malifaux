class window.Properties
  constructor: (@designer) ->
    @el = $("#properties")
    @selected = null
    @designer.bind "selection:change", (newSelection) => @selectionChanged(newSelection)

  render: ->
    @el.append """
      <h2 class="prop-selection"></h2>
      <section class="prop-section prop-layout">
        <h3 class="prop-section-header">Layout</h3>
        <div class="prop-content">
          <label for="prop-value-x">x</label>
          <input type="text" id="prop-value-x" class="prop-input prop-coord-input" data-fn="x" />
          <label for="prop-value-y">y</label>
          <input type="text" id="prop-value-y" class="prop-input prop-coord-input" data-fn="y" />
          <label for="prop-value-width">width</label>
          <input type="text" id="prop-value-width" class="prop-input prop-coord-input" data-fn="width" />
          <label for="prop-value-height">height</label>
          <input type="text" id="prop-value-height" class="prop-input prop-coord-input"  data-fn="height"/>
        </div>
      </section>

      <section class="prop-section prop-config"></section>
      <section class="prop-section prop-appearance"></section>
    """
    @bindEvents()
    @updateLayoutValues()
    @disable()


  bindEvents: ->
    @el.on 'input', '.prop-input', (e) =>
      input = $(e.target)
      @selected.content[input.data('fn')].call(@selected.content, input.val())

  selectionChanged: (newSelection) ->
    return if @selected is newSelection
    if @selected
      @selected.unbind "widget:move", @selectionMoved
    @selected = newSelection
    @updateLayoutValues()
    if @selected
      @selected.bind "widget:move", @selectionMoved
      @enable()
    else
      @disable()


  selectionMoved: => @updateLayoutValues()

  updateLayoutValues: () ->
    @el.find('#prop-value-x').val(@x())
    @el.find('#prop-value-y').val(@y())
    @el.find('#prop-value-width').val(@width())
    @el.find('#prop-value-height').val(@height())

  enable: ->
    @el.removeClass('disabled')
    @el.find('.prop-input').prop('disabled', false)
    @el.find('.prop-selection').text(@selected.displayName())
    @setAppearanceOptions()
    @setConfigOptions()

  disable: ->
    @el.addClass('disabled')
    @el.find('.prop-input').prop('disabled', true)
    @el.find('.prop-selection').html('Nothing Selected')
    @clearAppearanceOptions()
    @clearConfigOptions()

  setAppearanceOptions: ->
    options = @selected.renderAppearanceOptions()
    if options is false
      @clearAppearanceOptions()
    else
      @el.find('.prop-appearance').html """
          <h3 class="prop-section-header">Appearance</h3>
          <div class="prop-content">
            #{options}
          </div>
        </section>
      """

  clearAppearanceOptions: -> @el.find('.prop-appearance').html('')

  setConfigOptions: ->
    options = @selected.renderConfigOptions()
    if options is false
      @clearConfigOptions()
    else
      @el.find('.prop-config').html """
          <h3 class="prop-section-header">Configuration</h3>
          <div class="prop-content">
            #{options}
          </div>
        </section>
      """

  clearConfigOptions: -> @el.find('.prop-config').html('')


  x: -> @selected?.x() or ''
  y: -> @selected?.y() or ''
  width: -> @selected?.width() or ''
  height: -> @selected?.height() or ''
