class window.DatatableContent
  constructor: (config={}) -> null

  render: (mode, data={name: "{Student Name}"}) ->
    name = utils.escape(data.name)
    @el = $("""
      <table></table>
    """)

  serialize: -> {}