window.App = {
	PAGE_SELECTOR: '#page'
	GRID_SIZE: [20, 20]

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