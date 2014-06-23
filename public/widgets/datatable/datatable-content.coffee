class window.DatatableContent extends WidgetContent

  defaultWidth: -> 640
  defaultHeight: -> 480

  constructor: (config={}) ->
    @columns = @get(config.columns, [])

  render_layout: (data) ->
    name = utils.escape(data.name)
    columnTitles = for col in @columns
      "<th>#{col.title}</th>"
    node = $("""
      <table class="datatable">
        <thead>
          <tr>
            <th></th>
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
          <th>
            <strong class="subject">#{subject.subjectName}</strong>
            <em class="teacher">#{subject.teacherNames}</em>
          </th>
          #{columnValues.join("\n")}
        </tr>
      """)
    node

  render_edit: (data) ->
    row = (i, col) =>
      options = for key, opt of @assessmentPoints()
        """<option value="#{key}" #{if key is col.value then 'selected="selected"' else ''}>[#{opt.name}] #{opt.longName}</option>"""
      """<tr class="column-setting">
        <td><input class="col-title" name="col-title-#{i}" type="text" value="#{col.title}" /></td>
        <td>
          <select class="col-value" name="col-value-#{i}">
            <option value="" #{if col.value is "" then 'selected="selected"' else ''}></option>
            #{options.join("\n")}
          </select>
        </td>
      </tr>"""
    rows = (row(i, col) for col, i in @columns)
    rows.push(row(@columns.length, {title:'', value:''}))
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
          <tbody>
              #{rows.join("\n")}
          </tbody>
        </table>
        <button id="done">Done</button>
      </div>
    """)
    node

  bindEvents: (el) ->
    el.find("#done").click =>
      @saveConfig()
      @cancelEditing()

  saveConfig: ->
    columns = for col in @el.find('.column-setting')
      title = $(col).find('.col-title').val()
      value = $(col).find('.col-value').val()
      {title: title, value: value}
    @columns = (col for col in columns when col.title isnt '' and col.value? and col.value isnt '')

  serialize: ->
    {columns: @columns}
