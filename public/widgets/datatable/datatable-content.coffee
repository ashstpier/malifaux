class window.DatatableContent extends WidgetContent

  @STYLE_DEFAULTS: {
    heading_text_color: '#000000'
    heading_background_color: '#FFFFFF'
  }

  defaultWidth: -> 640
  defaultHeight: -> 480

  constructor: (config={}) ->
    @columns = @get(config.columns, [])
    @style = $.extend({}, DatatableContent.STYLE_DEFAULTS, @get(config.style, {}))

  render_layout: (data) ->
    name = utils.escape(data.name)
    columnTitles = for col in @columns
      "<th #{@headingStyles()}>#{col.title}</th>"
    node = $("""
      <table class="datatable">
        <thead>
          <tr>
            <th #{@headingStyles()}></th>
            #{columnTitles.join("\n")}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    """)
    for code, subject of data.subjects
      columnValues = for col in @columns
        "<td>#{subject.results?[col.value] or ''}</td>"
      node.find("tbody").append("""
        <tr>
          <th #{@headingStyles()}>
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
        <h3>Configure Data Table</h3>
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
        #{@styleOption('heading_text_color', "Heading Text Color")}
        #{@styleOption('heading_background_color', "Heading Background Color")}

        <button id="done">Done</button>
      </div>
    """)
    table = node.find('.edit-rows')
    table.append(@buildEditRow(col)) for col in @columns
    table.append(@buildEditRow())
    node

  buildEditRow: (col={title:'', value:''}) ->
    options = for key, opt of @assessmentPoints()
      """<option value="#{key}" #{if key is col.value then 'selected="selected"' else ''}>[#{opt.name}] #{opt.longName}</option>"""

    """<tr class="column-setting">
      <td><input class="col-title" name="col-title" type="text" value="#{col.title}" /></td>
      <td>
        <select class="col-value" name="col-value">
          <option value="" #{if col.value is "" then 'selected="selected"' else ''}></option>
          #{options.join("\n")}
        </select>
      </td>
    </tr>"""

  styleOption: (key, label=key) ->
    """
      <p>
        <label>
          #{label}:
          <input class="style-option" name="#{key}" type="text" value="#{@style[key]}" />
        </label>
      </p>
    """

  headingStyles: ->
    """style="background-color: #{@style.heading_background_color}; color: #{@style.heading_text_color};" """

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

  serialize: ->
    {columns: @columns, style: @style}
