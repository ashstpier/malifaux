App = {
	widgets: []

	init: -> @bindEvents()

	bindEvents: ->
		$('#add').click => @addWidget()

	addWidget: ->
		console.log "adding widget"
		widget = new Widget(utils.guid())
		@widgets.push(widget)
		widget.render()
}


$ -> App.init()