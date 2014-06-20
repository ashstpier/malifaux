class window.DatatableContent extends WidgetContent

  render_layout: (data) ->
    name = utils.escape(data.name)
    node = $("""
      <table class="datatable">
        <thead>
          <tr>
            <th></th>
            <th>Year 8 Baseline</th>
            <th>Au1</th>
            <th>Au2</th>
            <th>Sp1</th>
            <th>Sp2</th>
            <th>Su1</th>
            <th>End of Year Target</th>
            <th>On Track?</th>
            <th>Effort</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    """)
    for code, subject of data.subjects
      node.find("tbody").append("""
        <tr>
          <th>
            <strong class="subject">#{subject.subjectName}</strong>
            <em class="teacher">#{subject.teacherNames}</em>
          </th>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>#{subject.results?.Y11BG or ''}</td>
          <td>-</td>
          <td>B</td>
        </tr>
      """)
    node