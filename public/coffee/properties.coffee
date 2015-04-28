class window.Properties
  constructor: (@designer) ->
    @el = $("#properties")
    @selected = null
    @designer.bind "selection:change", (newSelection) => @selectionChanged(newSelection)
    @designer.bind "sidebar:redraw",  => @redraw()

  render: ->
    @el.append """
      <h2 class="prop-selection"></h2>
      <section class="prop-section prop-page-options">
        <h3 class="prop-section-header">Options</h3>
        <div class="prop-content">
          <form id="orientation" class="prop-form">
            <h4 class="prop-option-header">Orientation</h4>
            <label class="prop-block-label">
              <input type="radio" name="orientation" value="portrait">
              Portrait
            </label>
            <label class="prop-block-label">
              <input type="radio" name="orientation" value="landscape">
              Landscape
            </label>
          </form>
          <form id="pagetype" class="prop-form">
            <h4 class="prop-option-header">Report Style</h4>
            <label class="prop-block-label">
              <input type="radio" name="pagetype" value="student">
              Student per page
            </label>
            <label class="prop-block-label">
              <input type="radio" name="pagetype" value="subject">
              Subject per page
            </label>
          </form>
        </div>
      </section>
      <section class="prop-section prop-layout">
        <h3 class="prop-section-header">Layout</h3>
        <div class="prop-content">
          <label for="prop-value-x">x</label>
          <input type="number" step="1" id="prop-value-x" class="prop-coord-input" data-fn="x" />
          <label for="prop-value-y">y</label>
          <input type="number" step="1" id="prop-value-y" class="prop-coord-input" data-fn="y" />
          <label for="prop-value-width">width</label>
          <input type="number" step="1" id="prop-value-width" class="prop-coord-input" data-fn="width" />
          <label for="prop-value-height">height</label>
          <input type="number" step="1" id="prop-value-height" class="prop-coord-input"  data-fn="height"/>
        </div>
      </section>

      <section class="prop-section prop-config"></section>
      <section class="prop-section prop-appearance"></section>
    """
    @bindEvents()
    @updateLayoutValues()
    @disable()


  bindEvents: ->
    @el.on 'input', '.prop-coord-input', (e) =>
      input = $(e.target)
      @selected[input.data('fn')].call(@selected, input.val())
    @el.on 'input', 'input.prop-input', (e) =>
      input = $(e.target)
      @selected.content[input.data('fn')].call(@selected.content, input.val())
    @el.on 'change', 'select.prop-input', (e) =>
      input = $(e.target)
      @selected.content[input.data('fn')].call(@selected.content, input.val())
    @el.on 'change', '.prop-input-checkbox', (e) =>
      input = $(e.target)
      @selected.content[input.data('fn')].call(@selected.content, input.is(":checked"))


  selectionChanged: (newSelection) ->
    if @selected
      @selected.unbind "widget:move", @selectionMoved
    @selected = newSelection
    @updateLayoutValues()
    if @selected
      @selected.bind "widget:move", @selectionMoved
      @enable()
    else
      @disable()


  selectionMoved: =>
    @updateLayoutValues()
    true

  updateLayoutValues: () ->
    @el.find('#prop-value-x').val(@x())
    @el.find('#prop-value-y').val(@y())
    @el.find('#prop-value-width').val(@width())
    @el.find('#prop-value-height').val(@height())

  redraw: ->
    @setAppearanceOptions()
    @setConfigOptions()

  enable: ->
    @el.find('.prop-page-options').hide()
    @el.find('.prop-layout').show()
    @el.removeClass('disabled')
    @el.find('.prop-input').prop('disabled', false)
    @el.find('.prop-selection').text(@selected.displayName())
    @redraw()

  disable: ->
    @el.find('.prop-layout').hide()
    @el.find('.prop-page-options').show()
    @el.find('.prop-input').prop('disabled', true)
    @el.find('.prop-selection').html('Page')
    @clearAppearanceOptions()
    @clearConfigOptions()

  setAppearanceOptions: ->
    options = @selected.renderAppearanceOptions()
    if options is false
      @clearAppearanceOptions()
    else
      options = [options] unless $.isArray(options)
      options = for o in options
        if typeof o is 'string' then $(o) else o

      appearance = @el.find('.prop-appearance')
      appearance.html """
          <h3 class="prop-section-header">Appearance</h3>
          <div class="prop-content">
          </div>
        </section>
      """
      appearance.find('.prop-content').append(options)

  clearAppearanceOptions: -> @el.find('.prop-appearance').html('')

  setConfigOptions: ->
    options = @selected.renderConfigOptions()
    if options is false
      @clearConfigOptions()
    else
      options = [options] unless $.isArray(options)
      options = for o in options
        if typeof o is 'string' then $(o) else o

      config = @el.find('.prop-config')
      config.html """
          <h3 class="prop-section-header">Configuration</h3>
          <div class="prop-content">
          </div>
        </section>
      """
      for option in options
        config.find('.prop-content').append(option)

  clearConfigOptions: -> @el.find('.prop-config').html('')


  x: -> @selected?.x() or ''
  y: -> @selected?.y() or ''
  width: -> @selected?.width() or ''
  height: -> @selected?.height() or ''
