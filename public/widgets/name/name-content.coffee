class window.NameContent extends WidgetContent

  render_layout: (data) ->
    name = utils.escape(data.name)
    $("<p>#{name}</p>")
