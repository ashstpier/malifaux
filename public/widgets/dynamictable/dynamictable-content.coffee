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
    border_color: '#999'
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
    @_subject = @get(config.subject, 'PH')

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
      else if @style.header_position == 'left'
        for column, c in row
          if c == 0
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, data, edit)}</th>""")
          else
            tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, data, edit)}</td>""")
      else
        if i == 0
          for column in row
            tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, data, edit)}</th>""")
        else
          for column, c in row
            if c == 0
              tr.append("""<th style="#{@headingStyles()}">#{@cellContent(column, data, edit)}</th>""")
            else
              tr.append("""<td style="#{@cellStyles(i+1)}">#{@cellContent(column, data, edit)}</td>""")

      tbody.append(tr)

    self = this
    table.on "click", "input:text", ->
      el = $(this)
      self.el.parents('.widget-dynamictable').css('overflow', 'visible')
      $('.dynamic-list').remove()
      td = el.parent()
      td.append(self.dynamicOptions(el))
      $('.dynamic-list').css('top', el.height() + 1)

      $('.dynamic-list').on "change", "#category-select", ->
        $(".dynamic-select").remove()
        if $(this).val() == "basic"
          $('.dynamic-list').append(self.basicInfoSelect(el))
        else
          $('.dynamic-list').append(self.assessmentInfoSelect(el))

      $('.dynamic-list').on "change", "#field-select", ->
        option = $(this).val()
        el.data('dynamic', true)
        el.data('key', option)
        el.data('subject', '')
        $('.dynamic-list').remove()
        cell = self.makeCell(option, true)
        el.val(self.cellValue(cell, data, false))

      $('.dynamic-list').on "change", "#assessment-select", ->
        option = $(this).val()
        subject = $("#category-select").val()
        el.data('dynamic', true)
        el.data('key', option)
        el.data('subject', subject)
        $('.dynamic-list').remove()
        cell = self.makeCell(option, true, subject)
        el.val(self.cellValue(cell, data, false))
    table



  cellContent: (cell, data, edit) ->
    if edit
      """<input type="text" data-dynamic="#{cell.dynamic}" data-key="#{cell.value}" data-subject="#{cell.subject or ''}" value="#{@cellValue(cell, data, false)}">"""
    else
      @cellValue(cell, data)

  cellValue: (cell, data, html=true) ->
    subject = null
    if cell.dynamic
      if Object.keys(@metrics()).indexOf(cell.value) is -1
        subject = @widget.subject or cell.subject
        subjectData = data.subjects[subject]
        value = null
        if subjectData
          value = subjectData[cell.value] or subjectData.results?[cell.value]
      else
        value = @fieldFrom(cell.value, data)
      @mappings[value] or value or @placeholderWithLabel([subject,cell.value].join(':'), html)
    else
      cell.value

  dynamicOptions: (el) ->

    options = """<div class="dynamic-list"><p>Type free text or select a dynamic option from below</p>"""
    options += @categorySelect(el)
    if el.data('subject')
      options += @assessmentInfoSelect(el)
    else
      options += @basicInfoSelect(el)
    options += """</div>"""


  categorySelect: (el)->
    if @widget.subject

      category_select = """<select id="category-select">
      <option value="basic">Basic Information</option>
      <option value="assessment" #{if el.data('subject') then 'selected'}>Assessment Information</option>
      </select>"""

    else

      category_select = """<select id="category-select"><option value="basic">Basic Information</option>"""
      for option, name of API.subjects()
        unless option is ''
          if el.data('subject') is option
            category_select += """<option value="#{option}" selected>#{name}</option>"""
          else
            category_select += """<option value="#{option}">#{name}</option>"""

      category_select += """</select>"""


  basicInfoSelect: (el) ->
    field_select = """<select id="field-select" class="dynamic-select"><option value="" disabled selected>Select an option...</option>"""

    for option, name of @metrics()
      if el.data('key') is option
        field_select += """<option value="#{option}" selected>#{name}</option>"""
      else
        field_select += """<option value="#{option}">#{name}</option>"""

    field_select += """</select>"""


  assessmentInfoSelect: (el) ->
    field_select = """<select id="assessment-select" class="dynamic-select"><option value="" disabled selected>Select an option...</option>"""

    field_select += """<optgroup label="Basic Info">"""
    for field, name of API.subjectFields()
      if el.data('key') is field
        field_select += """<option value="#{field}" selected>#{name}</option>"""
      else
        field_select += """<option value="#{field}">#{name}</option>"""

    field_select += """</optgroup><optgroup label="Assessment Points">"""

    for point in @assessmentPoints()
      if el.data('key') is point.code
        field_select += """<option value="#{point.code}" selected>#{point.longName}</option>"""
      else
        field_select += """<option value="#{point.code}">#{point.longName}</option>"""

    field_select += """</optgroup></select>"""


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
      @option('select', 'header_position', "Header position", options: {top: "Top", left: 'Left', both: "Both"})
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
    Designer.history.push(this, 'updateMapping', oldMappings, newMappings, Designer.template.currentPageNumber)

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
    Designer.history.push(this, 'updateTable', oldTabledata, @tabledata, Designer.template.currentPageNumber)
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
    Designer.history.push(this, 'updateTable', oldTabledata, @tabledata, Designer.template.currentPageNumber)
    @redraw()

  makeCell: (value='', dynamic=false, subject='') => {dynamic: dynamic, subject: subject, value: value}

  render_edit: (data) ->
    @render_layout(data, true)

  bindEvents: (el) ->
    updateFn = => @buildTabledata(el)
    el.on 'input', 'input', ->
      $(this).data('dynamic', false)
      $(this).data('key', '')
    el.on 'change', updateFn
    @widget.unbind 'widget:layout-switching', updateFn
    @widget.bind 'widget:layout-switching', updateFn

  buildTabledata: (el) ->
    # el.parents('.widget-dynamictable').css('overflow', 'hidden')
    newTabledata = []

    rows = $(el).find('tr')
    for row in rows
      cells = $(row).find('input')
      cellArray = []
      for cell in cells
        $cell = $(cell)
        if $cell.data('dynamic')
          cellArray.push(@makeCell($cell.data('key'), true, $cell.data('subject')))
        else
          cellArray.push(@makeCell($cell.val(), false))
      newTabledata.push(cellArray)

    Designer.history.push(this, 'updateTable', @tabledata, newTabledata, Designer.template.currentPageNumber)
    @tabledata = newTabledata

  updateTable: (newTabledata) =>
    @tabledata = newTabledata
    @redraw()
    Designer.select(@widget)

  fieldFrom: (field, data) ->
    data = data[key] for key in field.split('.')
    data


  serialize: -> { tabledata: @tabledata, style: @style, mappings: @mappings }
