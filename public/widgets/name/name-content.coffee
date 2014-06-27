class window.NameContent extends WidgetContent

  @displayName: "Student Name"
  @description: "Name of the student in the format \"last, first\""
  @icon:        "girl"

  defaultWidth: -> 280
  defaultHeight: -> 40

  render_layout: (data) ->
    name = utils.escape(data.name)
    $("<p>#{name}</p>")
