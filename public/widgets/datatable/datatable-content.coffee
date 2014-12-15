class window.DatatableContent extends WidgetContent
  @className:   "DatatableContent"
  @displayName: "Subjects Data Table"
  @description: "Showing assessment points, one row per subject."
  @icon:        "book_open"

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
        """<td style="#{@cellStyles(i+1, @cellValue(subject, col))}">#{@cellContent(subject, col)}</td>"""
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
    if @widget.subject
      return [subjects[@widget.subject]]
    _.filter subjects, (subject) =>
      return true unless @_exclusions
      exclusions = ($.trim(e).toLowerCase() for e in @_exclusions.split(","))
      !_.contains(exclusions, subject.subjectName.toLowerCase())

  buildEditRow: (col={title:'', value:'', compare_to:'', mappings:{}}) ->
    col.mappings = {} unless col.mappings
    options = (val) =>
      for point in @assessmentPoints()
        """<option value="#{point.code}" #{if point.code is val then 'selected="selected"' else ''}>#{point.name} | #{point.longName}</option>"""

    """<tr class="column-setting" data-mappings="#{JSON.stringify(col.mappings).replace(/\"/g,'&quot;')}">
      <td>
        <input class="col-title" name="col-title" type="text" value="#{col.title}" placeholder="Untitled..." />
        <span class="col-comp-label">compared to:</ span>
      </td>
      <td>
        <select class="col-value" name="col-value">
          <option value="" #{if col.value is "" then 'selected="selected"' else ''}></option>
          #{options(col.value).join("\n")}
        </select>
        <select class="col-compare-to" name="col-compare-to">
          <option value="" #{if col.compare_to is "" then 'selected="selected"' else ''}></option>
          #{options(col.compare_to).join("\n")}
        </select>
        <a href="#" class="mapping">#{if $.isEmptyObject(col.mappings) then 'Add word mappings...' else 'Edit word mappings...'}</a>
      </td>
    </tr>"""

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

  subject_order: @property('style', 'subject_order')
  font: @property('style', 'font')
  size: @property('style', 'size')
  heading_text_color: @property('style', 'heading_text_color')
  heading_background_color: @property('style', 'heading_background_color')
  cell_text_color: @property('style', 'cell_text_color')
  cell_background_color_odd: @property('style', 'cell_background_color_odd')
  cell_background_color_even: @property('style', 'cell_background_color_even')

  exclusions: @property('_exclusions')

  renderConfigOptions: ->
    [
      @option('select', 'subject_order', "Subject Order", options: {alphabetical: "Alphabetical", core_first: 'Core First'})
      @columSettings()
      @option('text', 'exclusions', 'Subject Blacklist', hint: "A comma seperated, case insensitive, list of subject names to be excluded from reports.")
    ]

  columSettings: ->
    node = $("""
      <div class="datatable-cols prop-table-config">
        <h4>Columns</h4>
        <div class="prop-table-wrap">
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
      </div>
    """)
    table = node.find('.edit-rows')
    table.append(@buildEditRow(col)) for col in @columns
    table.append(@buildEditRow())
    columnChanged = =>
      console.log 'option changed'
      @maybeAddEditRow(table)
      @saveColumns(table)
      @redraw()
    table.on "input", ".col-title", columnChanged
    table.on "change", ".col-value, .col-compare-to", columnChanged
    self = this
    table.on "click", ".mapping", ->
      element = this
      mappingIndex = $(this).parents('.column-setting').index()
      mappings = $(element).parents(".edit-rows").find(".column-setting:eq(#{mappingIndex})").data('mappings')
      new MappingModal mappings, (newMappings) => self.updateMapping(mappingIndex, newMappings)
    node

  updateMapping: (index, newMappings) =>
    editrows = $(".edit-rows")
    editrows.find(".column-setting:eq(#{index})").data('mappings', newMappings)

    @saveColumns(editrows)
    @redraw()

  headingStyles: ->
    @styleString('background-color': @style.heading_background_color, color: @style.heading_text_color)

  cellStyles: (row, content) ->
    bg_color = if row % 2 is 0 then @style.cell_background_color_even else @style.cell_background_color_odd
    text_align = if content.split(' ').length > 1 then 'left' else 'center'
    @styleString('background-color': bg_color, color: @style.cell_text_color, 'text-align': text_align)

  cellValue: (subject, col) ->
    originalValue = subject.results?[col.value] or ''
    col.mappings?[originalValue] or originalValue

  cellContent: (subject, col) ->
    val = @cellValue(subject, col)
    return val unless col.compare_to and col.compare_to.length > 0
    numVal = subject.internalPoints?[col.value] or 0
    compareTo = subject.internalPoints?[col.compare_to] or 0
    tlClass = 'amber'
    tlClass = 'red' if numVal < compareTo
    tlClass = 'green' if numVal > compareTo
    """<span class="traffic-light #{tlClass}"></span>"""

  maybeAddEditRow: (el) ->
    rows = el.find('.column-setting')
    lastRow = $(rows[rows.length-1])
    if lastRow.find('.col-value').val() isnt ''
      lastRow.after(@buildEditRow())

  saveColumns: (el) ->
    oldColumns = @columns
    columns = for col in el.find('.column-setting')
      $col = $(col)
      {
        title:            $col.find('.col-title').val()
        value:            $col.find('.col-value').val()
        compare_to:       $col.find('.col-compare-to').val()
        mappings:         $col.data('mappings')
      }
    @columns = (col for col in columns when col.value? and col.value isnt '')
    Designer.history.push(this, 'setColumnsFromUndo', oldColumns, @columns)

  setColumnsFromUndo: (cols) ->
    @columns = cols
    @redraw()
    Designer.select(@widget)


  orderdSubjects: (subjects) ->
    subjects = (v for k,v of subjects)
    alphabetical = subjects.sort (a,b) => if a.subjectName >= b.subjectName then 1 else -1
    return alphabetical if @style.subject_order is 'alphabetical'
    rank = {
      'english':     1
      'maths':       2
      'mathematics': 2
      'science':     3
    }
    _.sortBy alphabetical, (subject) ->
        name = subject.subjectName.toLowerCase()
        if rank[name]
          rank[name]
        else
          name.charCodeAt(0)

  serialize: ->
    {columns: @columns, style: @style, exclusions: @_exclusions}
