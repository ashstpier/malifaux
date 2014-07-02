class window.DatatableContent extends WidgetContent

  @displayName: "Subjects Data Table"
  @description: "Showing assessment points, one row per subject."
  @icon:        "table"

  @STYLE_DEFAULTS: {
    subject_order: 'alphabetical'
    heading_text_color: '#000000'
    heading_background_color: '#FFFFFF'
    cell_text_color: '#000000'
    cell_background_color_odd: '#FFFFFF'
    cell_background_color_even: '#FFFFFF'
    font: 'Helvetica'
    size: 'Medium'
  }

  defaultWidth: -> 640
  defaultHeight: -> 480

  initWithConfig: (config) ->
    @columns = @get(config.columns, [])
    @style = $.extend({}, DatatableContent.STYLE_DEFAULTS, @get(config.style, {}))

  render_layout: (data) ->
    name = utils.escape(data.name)
    columnTitles = for col in @columns
      """<th style="#{@headingStyles()}">#{col.title}</th>"""
    node = $("""
      <table class="datatable" style="#{@styleString('font-family': utils.fontMap[@style.font], 'font-size': utils.sizeMap[@style.size])}">
        <thead>
          <tr>
            <th style="#{@headingStyles()}"></th>
            #{columnTitles.join("\n")}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    """)
    for subject, i in @orderdSubjects(data.subjects)
      columnValues = for col in @columns
        """<td style="#{@cellStyles(i+1)}">#{subject.results?[col.value] or ''}</td>"""
      node.find("tbody").append("""
        <tr>
          <th style="#{@headingStyles()}">
            <strong class="subject">#{subject.subjectName}</strong>
            <em class="teacher">#{subject.teacherNames}</em>
          </th>
          #{columnValues.join("\n")}
        </tr>
      """)
    node

  render_edit: (data) ->
    node = $("""
      <div class="datatable-edit">
        <h4>Columns</h4>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody class="edit-rows">
          </tbody>
        </table>

        <h4>Style</h4>
        #{@styleOption('select', 'subject_order', "Order of Subjects", alphabetical: "Alphabetical", core_first: 'Core First')}
        #{@styleOption('font',  'font', "Font")}
        #{@styleOption('size',  'size', "Text Size")}
        #{@styleOption('color', 'heading_text_color', "Heading Text Color")}
        #{@styleOption('color', 'heading_background_color', "Heading Background Color")}
        #{@styleOption('color', 'cell_text_color', "Cell Text Color")}
        #{@styleOption('color', 'cell_background_color_odd', "Cell Background Color (odd rows)")}
        #{@styleOption('color', 'cell_background_color_even', "Cell Background Color (even rows)")}
        <button id="done">Done</button>
      </div>
    """)
    table = node.find('.edit-rows')
    table.append(@buildEditRow(col)) for col in @columns
    table.append(@buildEditRow())
    node

  buildEditRow: (col={title:'', value:''}) ->
    options = for point in @assessmentPoints()
      """<option value="#{point.code}" #{if point.code is col.value then 'selected="selected"' else ''}>#{point.name} | #{point.longName}</option>"""

    """<tr class="column-setting">
      <td><input class="col-title" name="col-title" type="text" value="#{col.title}" /></td>
      <td>
        <select class="col-value" name="col-value">
          <option value="" #{if col.value is "" then 'selected="selected"' else ''}></option>
          #{options.join("\n")}
        </select>
      </td>
    </tr>"""

  headingStyles: ->
    @styleString('background-color': @style.heading_background_color, color: @style.heading_text_color)

  cellStyles: (row) ->
    bg_color = if row % 2 is 0 then @style.cell_background_color_even else @style.cell_background_color_odd
    @styleString('background-color': bg_color, color: @style.cell_text_color)

  bindEvents: (el) ->
    el.on "change", ".col-title, .col-value", => @maybeAddEditRow()
    el.find("#done").click =>
      @saveConfig()
      @cancelEditing()

  maybeAddEditRow: ->
    rows = @el.find('.column-setting')
    lastRow = $(rows[rows.length-1])
    if lastRow.find('.col-title').val() isnt ''
      lastRow.after(@buildEditRow())

  saveConfig: ->
    @saveColumns()
    @saveStyle()

  saveColumns: ->
    columns = for col in @el.find('.column-setting')
      title = $(col).find('.col-title').val()
      value = $(col).find('.col-value').val()
      {title: title, value: value}
    @columns = (col for col in columns when col.title isnt '' and col.value? and col.value isnt '')

  saveStyle: ->
    for el in @el.find('.style-option')
      name = $(el).attr('name')
      @style[name] = $(el).val()

  orderdSubjects: (subjects) ->
    subjects = (v for k,v of subjects)
    alphabetical = subjects.sort (a,b) =>
      if @style.subject_order is 'core_first'
        if a.subjectName is 'English' or a.subjectName is 'Maths' or a.subjectName is 'Science'
          return -1
        else
          return 1
      else
        if a.subjectName >= b.subjectName then 1 else -1

    alphabetical

  serialize: ->
    {columns: @columns, style: @style}
