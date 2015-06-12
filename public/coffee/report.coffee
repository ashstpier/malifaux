window.Report = {

 init: ->
  API.loadConfig =>
    @studentId = window.student_id or utils.querystring('studentid')
    @templateName = window.template or utils.querystring('template')
    @debug = utils.querystring('debug') is '1'
    Template.load @templateName, (template) =>
      @template = template
      API.student @studentId, (data) => @render(data)

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
   @template.render('display', data)
   @renderDebug(data) if @debug
   delay 100, -> window.status = 'ready'
}

$ ->
 Report.init()