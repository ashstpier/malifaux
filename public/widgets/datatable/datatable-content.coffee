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
  editable: -> true

  initWithConfig: (config) ->
    @columns = @get(config.columns, [])
    @style = $.extend({}, DatatableContent.STYLE_DEFAULTS, @get(config.style, {}))
    @_exclusions = @get(config.exclusions, '')

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
    filteredSubjects = @filter_subjects(data.subjects)
    for subject, i in @orderdSubjects(filteredSubjects)
      columnValues = for col in @columns
        """<td style="#{@cellStyles(i+1)}">#{@cellContent(subject, col)}</td>"""
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

  filter_subjects: (subjects) =>
    _.filter subjects, (subject) =>
      exclusions = ($.trim(e).toLowerCase() for e in @_exclusions.split(","))
      !_.contains(exclusions, subject.subjectName.toLowerCase())

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
      </div>
    """)
    table = node.find('.edit-rows')
    table.append(@buildEditRow(col)) for col in @columns
    table.append(@buildEditRow())
    node

  buildEditRow: (col={title:'', value:'', compare_to:''}) ->
    options = (val) =>
      for point in @assessmentPoints()
        """<option value="#{point.code}" #{if point.code is val then 'selected="selected"' else ''}>#{point.name} | #{point.longName}</option>"""

    """<tr class="column-setting">
      <td><input class="col-title" name="col-title" type="text" value="#{col.title}" /></td>
      <td>
        <select class="col-value" name="col-value" style="max-width: 400px">
          <option value="" #{if col.value is "" then 'selected="selected"' else ''}></option>
          #{options(col.value).join("\n")}
        </select>
        <p class="comparison">
          compared to
          <select class="col-compare-to" name="col-compare-to" style="max-width: 300px">
            <option value="" #{if col.compare_to is "" then 'selected="selected"' else ''}></option>
            #{options(col.compare_to).join("\n")}
          </select>
        </p>
      </td>
    </tr>"""

  renderAppearanceOptions: ->
    @option('font',  'font', "Font") +
    @option('size',  'size', "Text Size") +
    @option('color', 'heading_text_color', "Heading Text") +
    @option('color', 'heading_background_color', "Heading Bg") +
    @option('color', 'cell_text_color', "Cell Text") +
    @option('color', 'cell_background_color_odd', "Cell Bg Odd") +
    @option('color', 'cell_background_color_even', "Cell Bg Even")

  subject_order: @styleProperty('subject_order')
  font: @styleProperty('font')
  size: @styleProperty('size')
  heading_text_color: @styleProperty('heading_text_color')
  heading_background_color: @styleProperty('heading_background_color')
  cell_text_color: @styleProperty('cell_text_color')
  cell_background_color_odd: @styleProperty('cell_background_color_odd')
  cell_background_color_even: @styleProperty('cell_background_color_even')

  exclusions: (n) ->
    if n?
      @_exclusions = n
      @redraw()
    else
      @_exclusions

  renderConfigOptions: ->
    @option('select', 'subject_order', "Subject Order", options: {alphabetical: "Alphabetical", core_first: 'Core First'}) +
    @columSettings() +
    @option('text', 'exclusions', 'Subject Blacklist', hint: "A comma seperated, case insensitive, list of subject names to be excluded from reports.")

  columSettings: ->


  headingStyles: ->
    @styleString('background-color': @style.heading_background_color, color: @style.heading_text_color)

  cellStyles: (row) ->
    bg_color = if row % 2 is 0 then @style.cell_background_color_even else @style.cell_background_color_odd
    @styleString('background-color': bg_color, color: @style.cell_text_color)

  cellContent: (subject, col) ->
    val = subject.results?[col.value] or ''
    return val unless col.compare_to and col.compare_to.length > 0
    numVal = subject.internalPoints?[col.value] or 0
    compareTo = subject.internalPoints?[col.compare_to] or 0
    tlClass = 'amber'
    tlClass = 'red' if numVal < compareTo
    tlClass = 'green' if numVal > compareTo
    """<span class="traffic-light #{tlClass}">#{val}</span>"""

  bindEvents: (el) ->
    el.on "change", ".col-title, .col-value", => @maybeAddEditRow()

  maybeAddEditRow: ->
    rows = @el.find('.column-setting')
    lastRow = $(rows[rows.length-1])
    if lastRow.find('.col-title').val() isnt ''
      lastRow.after(@buildEditRow())

  saveConfig: ->
    @saveColumns()
    @saveStyle()
    @saveExclusions()

  saveExclusions: ->
    @_exclusions = $('#exclusions').val()

  saveColumns: ->
    columns = for col in @el.find('.column-setting')
      $col = $(col)
      {
        title:            $col.find('.col-title').val()
        value:            $col.find('.col-value').val()
        compare_to:       $col.find('.col-compare-to').val()
      }
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
    {columns: @columns, style: @style, exclusions: @_exclusions}
