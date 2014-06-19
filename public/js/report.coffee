window.Report = {

  init: ->
    Widget.loadAll =>
      @studentId = utils.querystring("studentid")
      @templateName = utils.querystring('template')
      @debug = utils.querystring('debug') is '1'
      @template = new Template(store.get(@templateName))
      $.get "#{@studentId}.json", (data) => @render(data)

  render: (data) ->
    @template.render(data)
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
}

class window.Template
  constructor: (@description) ->
    @page = $('body')
    @widgets = []
    @layout = @description.layout

  render: (data) ->
    for widgetConfig in @layout
      @addWidget(widgetConfig, data)

  addWidget: (widgetConfig, data) ->
    widgetConfig.mode = 'display'
    widget = new Widget(widgetConfig, data)
    @widgets.push(widget)
    @page.append(widget.render())

$ ->
  Report.init()