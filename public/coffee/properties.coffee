class window.Properties
  constructor: (@designer) ->
    @el = $("#properties")
    @selected = null
    @designer.bind "selection:change", (newSelection) => @selectionChanged(newSelection)

  render: ->
    @el.append """
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

      <section class="prop-section prop-appearance">
        <h3 class="prop-section-header">Appearance</h3>
        <div class="prop-content">
          no selection
        </div>
      </section>
    """
    @bindEvents()
    @updateLayoutValues()


  bindEvents: ->
    @el.find('.prop-layout .prop-input').change (e) =>
      input = $(e.target)
      @selected[input.data('fn')](input.val())

  selectionChanged: (newSelection) ->
    if @selected
      @selected.unbind "widget:move", @selectionMoved
    @selected = newSelection
    @updateLayoutValues()
    if @selected
      @selected.bind "widget:move", @selectionMoved


  selectionMoved: => @updateLayoutValues()

  updateLayoutValues: ->
    if @selected then @enable() else @disable()
    @el.find('#prop-value-x').val(@x())
    @el.find('#prop-value-y').val(@y())
    @el.find('#prop-value-width').val(@width())
    @el.find('#prop-value-height').val(@height())

  enable: ->
    @el.removeClass('disabled')
    @el.find('.prop-input').prop('disabled', false)

  disable: ->
    @el.addClass('disabled')
    @el.find('.prop-input').prop('disabled', true)


  x: -> @selected?.x() or ''
  y: -> @selected?.y() or ''
  width: -> @selected?.width() or ''
  height: -> @selected?.height() or ''
