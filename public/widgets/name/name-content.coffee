class window.NameContent
  constructor: (config={}) -> null

  render: (mode, data={name: "{Student Name}"}) ->
    name = utils.escape(data.name)
    @el = $("<p>#{name}</p>")

  serialize: -> {}
