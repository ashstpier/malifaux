class window.Properties
  constructor: (@designer) ->
    @el = $("#properties")
    @selected = null
    @designer.on "selection:change", => @selectionChanged()
    @designer.on "selection:moved", => @selectionMoved()

  render: ->
    @el.append """
      <div class="prop-section prop-layout">
        <div>
          x: <span id="prop-value-x"></span>
          y: <span id="prop-value-y"></span>
          width: <span id="prop-value-width"></span>
          height: <span id="prop-value-height"></span>
        </div>
      </div>

      <div class="prop-section prop-options">
        options
      </div>
    """

  selectionChanged: ->
    @selected = @designer.currentEditWidget
    @updateLayoutValues()

  selectionMoved: ->
    @updateLayoutValues()

  updateLayoutValues: ->
    @el.find('prop-value-x').html(@selected.x())
    @el.find('prop-value-y').html(@selected.y())
    @el.find('prop-value-width').html(@selected.width())
    @el.find('prop-value-height').html(@selected.height())
