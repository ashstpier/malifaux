class window.DynamicTableContent extends WidgetContent
  @className:   "DynamicTableContent"
  @displayName: "Dynamic Table"
  @description: "A blank table that can be filled with static or dynamic text."
  @icon:        "table"

  defaultWidth: -> 360
  defaultHeight: -> 160
  editable: -> true

  @DEFAULT_CONTENT: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]

  @STYLE_DEFAULTS: {
    header_position: 'top'
    heading_text_color: '#000000'
    heading_background_color: '#DDDDDD'
    cell_text_color: '#000000'
    cell_background_color_odd: '#FFFFFF'
    cell_background_color_even: '#FFFFFF'
    font: 'Helvetica'
    size: 'Medium'
  }

  header_position: @property('style', 'header_position')
  font: @property('style', 'font')
  size: @property('style', 'size')
  heading_text_color: @property('style', 'heading_text_color')
  heading_background_color: @property('style', 'heading_background_color')
  cell_text_color: @property('style', 'cell_text_color')
  cell_background_color_odd: @property('style', 'cell_background_color_odd')
  cell_background_color_even: @property('style', 'cell_background_color_even')

  initWithConfig: (config) ->
    @style = $.extend({}, DynamicTableContent.STYLE_DEFAULTS, @get(config.style, {}))
    @tabledata = @get(config.tabledata, DynamicTableContent.DEFAULT_CONTENT)

  render_layout: (data, edit=false) ->
    table = $("""<div class="dynamictable-widget">
      <table class="dynamictable #{if edit then "edited"}" style="#{@styleString('font-family': utils.fontMap[@style.font], 'font-size': utils.sizeMap[@style.size], 'color': @style.color)}">
        <tbody></tbody>
      </table>
    </div>""")
    tbody = table.find('tbody')
    for row, i in @tabledata
      tr = $('<tr></tr>')
      if @style.header_position == 'top'
        if i == 0
          for column in row
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, edit)}</th>""")
        else
          for column in row
            tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, edit)}</td>""")
      else
        for column, c in row
          if c == 0
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, edit)}</th>""")
          else
            tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, edit)}</td>""")
      tbody.append(tr)
    table

  cellContent: (cell, edit) ->
    if edit
      """<input type="text" value="#{cell}">"""
    else
      cell

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
      @option('text', 'numberOfColumns', "No. of columns")
      @option('text', 'numberOfRows', "No. of rows")
    ]

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

  numberOfColumns: (val=null) ->
    if val? and val.length > 0 and Number(val)
      val = Number(val)
      if val > 0
        @setColumns(val)
    @tabledata[0].length

  setRows: (rowCount) ->
    return @redraw() if rowCount is @numberOfRows()
    if @numberOfRows() > rowCount
      unless @numberOfRows() == 0 then @tabledata.pop()
    else
      @tabledata.push(@makeRow())
    @setRows(rowCount)

  makeRow: -> ('' for c in [1..@numberOfColumns()])

  setColumns: (columnCount) ->
    return @redraw() if columnCount is @numberOfColumns()
    if @numberOfColumns() > columnCount
      unless @numberOfColumns() == 0
        for row in @tabledata
          row.pop()
    else
      for row in @tabledata
        row.push(@makeColumn())
    @setColumns(columnCount)

  makeColumn: -> ('')

  render_edit: (data) ->
    @render_layout(data, true)

  bindEvents: (el) ->
    updateFn = => @buildTabledata(el)
    el.on 'change', updateFn
    @widget.unbind 'widget:layout-switching', updateFn
    @widget.bind 'widget:layout-switching', updateFn

  buildTabledata: (el) ->
    newTabledata = []

    rows = $(el).find('tr')
    for row in rows
      cells = $(row).find('input')
      cellArray = []
      for cell in cells
        cellArray.push($(cell).val())
      newTabledata.push(cellArray)

    Designer.history.push(this, 'updateTable', @tabledata, newTabledata)
    @tabledata = newTabledata

  updateTable: (newTabledata) =>
    @tabledata = newTabledata
    @redraw()
    Designer.select(@widget)

  serialize: -> { tabledata: @tabledata }
