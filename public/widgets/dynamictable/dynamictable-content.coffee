class window.DynamicTableContent extends WidgetContent
  @className:   "DynamicTableContent"
  @displayName: "Dynamic Table"
  @description: "A blank table that can be filled with static or dynamic text."
  @icon:        "table"

  defaultWidth: -> 360
  defaultHeight: -> 110
  editable: -> @widget.currentMode is 'layout'

  @STYLE_DEFAULTS: {
    header_position: 'top'
    alignment: 'left'
    heading_text_color: '#000000'
    heading_background_color: '#DDDDDD'
    cell_text_color: '#000000'
    cell_background_color_odd: '#FFFFFF'
    cell_background_color_even: '#FFFFFF'
    font: 'Helvetica'
    size: 'Medium'
  }

  @DEFAULT_COLUMNS = 3
  @DEFAULT_ROWS = 3

  header_position: @property('style', 'header_position')
  alignment: @property('style', 'alignment')
  font: @property('style', 'font')
  size: @property('style', 'size')
  heading_text_color: @property('style', 'heading_text_color')
  heading_background_color: @property('style', 'heading_background_color')
  cell_text_color: @property('style', 'cell_text_color')
  cell_background_color_odd: @property('style', 'cell_background_color_odd')
  cell_background_color_even: @property('style', 'cell_background_color_even')

  initWithConfig: (config) ->
    @style = $.extend({}, DynamicTableContent.STYLE_DEFAULTS, @get(config.style, {}))
    @mappings = @get(config.mappings, {})
    @tabledata = @get(config.tabledata, @makeDefaultTable())

  makeDefaultTable: ->
    for r in [1..DynamicTableContent.DEFAULT_ROWS]
      @makeCell() for c in [1..DynamicTableContent.DEFAULT_COLUMNS]

  render_layout: (data, edit=false) ->
    table = $("""<div class="dynamictable-widget">
      <table class="dynamictable #{if edit then "edited"}" style="#{@styleString('font-family': utils.fontMap[@style.font], 'font-size': utils.sizeMap[@style.size], 'color': @style.color, 'text-align': @style.alignment)}">
        <tbody></tbody>
      </table>
    </div>""")
    tbody = table.find('tbody')
    for row, i in @tabledata
      tr = $('<tr></tr>')
      if @style.header_position == 'top'
        if i == 0
          for column in row
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, data, edit)}</th>""")
        else
          for column in row
            tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, data, edit)}</td>""")
      else
        for column, c in row
          if c == 0
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, data, edit)}</th>""")
          else
            tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, data, edit)}</td>""")
      tbody.append(tr)

    self = this
    table.on "click", "input", ->
      el = $(this)
      self.el.parents('.widget-dynamictable').css('overflow', 'visible')
      $('.dynamic-list').remove()
      el.parent().append(self.dynamicOptions(el))

      $('.dynamic-list').css('top', el.height() + 1)

      $('.dynamic-list').on "click", "li", ->
        option = $(this).attr('data-key')
        el.attr('data-dynamic', true)
        el.attr('data-key', option)
        $('.dynamic-list').remove()
        value = $(this).attr('data-key')
        if Object.keys(self.metrics()).indexOf(value) is -1
          el.val(data.subjects[self.widget.subject].results?[value] or '')
        else
          el.val(self.fieldFrom($(this).attr('data-key'), data))
    table

  cellContent: (cell, data, edit) ->
    if edit
      """<input type="text" data-dynamic="#{cell.dynamic}" data-key="#{cell.value}" value="#{@cellValue(cell, data)}">"""
    else
      @cellValue(cell, data) or "&nbsp;"

  cellValue: (cell, data) ->
    if cell.dynamic
      if Object.keys(@metrics()).indexOf(cell.value) is -1
        if @widget.subject
          value = data.subjects[@widget.subject].results?[cell.value]
        else
          value = ''
      else
        value = @fieldFrom(cell.value, data)
      @mappings[value] or value
    else
      cell.value

  dynamicOptions: (el) ->
    list = """<ul class="dynamic-list">"""
    for option, name of @metrics()
      if el.attr('data-key') is option
        list += """<li data-key="#{option}">#{name}<i class="glyphicons ok_2"></i></li>"""
      else
        list += """<li data-key="#{option}">#{name}</li>"""
    if @widget.subject
      for point in @assessmentPoints()
        if el.attr('data-key') is point.name
          list += """<li data-key="#{point.name}">#{point.longName}<i class="glyphicons ok_2"></i></li>"""
        else
          list += """<li data-key="#{point.name}">#{point.longName}</li>"""
    list += """</ul>"""

  renderAppearanceOptions: ->
    [
      @option('font',  'font', "Font")
      @option('size',  'size', "Text Size")
      @option('color', 'heading_text_color', "Heading Text")
      @option('color', 'heading_background_color', "Heading Bg")
      @option('color', 'cell_text_color', "Cell Text")
      @option('color', 'cell_background_color_odd', "Cell Bg Odd")
      @option('color', 'cell_background_color_even', "Cell Bg Even")
    ]

  renderConfigOptions: ->
    [
      @option('select', 'header_position', "Header position", options: {top: "Top", left: 'Left'})
      @option('select', 'alignment', "Cell alignment", options: {left: "Left", center: 'Center', right: 'Right'})
      @option('text', 'numberOfColumns', "No. of columns")
      @option('text', 'numberOfRows', "No. of rows")
      @mappingSettings()
    ]

  mappingSettings: ->
    node = $("""<div class="mapping-option"><a href="#" class="mapping">#{if $.isEmptyObject(@mappings) then 'Add word mappings...' else 'Edit word mappings...'}</a></div>""")
    self = this
    node.on "click", ".mapping", =>
      new MappingModal(@mappings, @changeMapping)
    node

  changeMapping: (newMappings) =>
    oldMappings = @mappings
    @updateMapping(newMappings)
    Designer.history.push(this, 'updateMapping', oldMappings, newMappings)

  updateMapping: (mappings) =>
    @mappings = mappings
    @redraw()

  headingStyles: ->
    @styleString('background-color': @style.heading_background_color, color: @style.heading_text_color)

  cellStyles: (row) ->
    bg_color = if row % 2 is 0 then @style.cell_background_color_even else @style.cell_background_color_odd
    @styleString('background-color': bg_color, color: @style.cell_text_color)

  numberOfRows: (val=null) ->
    if val? and val.length > 0
      val = Number(val)
      if val > 0
        @setRows(val)
    @tabledata.length

  numberOfColumns: (val=null) =>
    if val? and val.length > 0 and Number(val)
      val = Number(val)
      if val > 0
        @setColumns(val)
    @tabledata[0].length

  setRows: (rowCount) ->
    return if rowCount is @numberOfRows()
    oldTabledata = $.extend(true, [], @tabledata)
    until rowCount is @numberOfRows()
      if @numberOfRows() > rowCount
        unless @numberOfRows() == 0 then @tabledata.pop()
      else
        @tabledata.push(@makeRow())
    Designer.history.push(this, 'updateTable', oldTabledata, @tabledata)
    @redraw()


  makeRow: -> (@makeCell() for c in [1..@numberOfColumns()])

  setColumns: (columnCount) ->
    return if columnCount is @numberOfColumns()
    oldTabledata = $.extend(true, [], @tabledata)
    until columnCount is @numberOfColumns()
      if @numberOfColumns() > columnCount
        unless @numberOfColumns() == 0
          for row in @tabledata
            row.pop()
      else
        for row in @tabledata
          row.push(@makeCell())
    Designer.history.push(this, 'updateTable', oldTabledata, @tabledata)
    @redraw()

  makeCell: (value='', dynamic=false) => {dynamic: dynamic, value: value}

  render_edit: (data) ->
    @render_layout(data, true)

  bindEvents: (el) ->
    updateFn = => @buildTabledata(el)
    el.on 'input', 'input', ->
      $(this).attr('data-dynamic', false)
      $(this).attr('data-key', '')
    el.on 'change', updateFn
    @widget.unbind 'widget:layout-switching', updateFn
    @widget.bind 'widget:layout-switching', updateFn

  buildTabledata: (el) ->
    el.parents('.widget-dynamictable').css('overflow', 'hidden')
    newTabledata = []

    rows = $(el).find('tr')
    for row in rows
      cells = $(row).find('input')
      cellArray = []
      for cell in cells
        $cell = $(cell)
        if $cell.data('dynamic')
          cellArray.push(@makeCell($cell.data('key'), true))
        else
          cellArray.push(@makeCell($cell.val(), false))
      newTabledata.push(cellArray)

    Designer.history.push(this, 'updateTable', @tabledata, newTabledata)
    @tabledata = newTabledata

  updateTable: (newTabledata) =>
    @tabledata = newTabledata
    @redraw()
    Designer.select(@widget)

  fieldFrom: (field, data) ->
    data = data[key] for key in field.split('.')
    data

  serialize: -> { tabledata: @tabledata, style: @style, mappings: @mappings }
