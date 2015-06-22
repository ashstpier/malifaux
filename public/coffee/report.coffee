window.Report = {

  READY_DELAY: 250

  init: ->
    console.log 'loading configuration data...'
    API.loadConfig =>
      @studentId = window.student_id or utils.querystring('studentid')
      @templateName = window.template or utils.querystring('template')
      @page = window.page or utils.querystring('page') or 0
      @debug = utils.querystring('debug') is '1'
      console.log 'loading page template...'
      Template.load @templateName, (template) =>
        @template = template
        console.log 'loading student data...'
        API.student @studentId, (data) =>
          @render(data)

  renderDebug: (data) ->
    if @debug
      $('body').append("""
        <div style="height:1344px;" />
        <hr/>
        <h3>Student Data</h3>
        <pre>#{JSON.stringify(data, null, 2)}</pre>
        <hr/>
        <h3>Template Data</h3>
        <pre><code>#{utils.escape(JSON.stringify(@template.description, null, 2))}</code></pre>
      """)

  render: (data) ->
    console.log 'rendering...'
    @template.renderPage(@page, 'display', data)
    @renderDebug(data) if @debug
    console.log 'waiting for page to settle...'
    delay @READY_DELAY, ->
      console.log 'ready'
      window.status = 'ready'
}

$ ->
 Report.init()