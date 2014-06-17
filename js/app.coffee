window.App = {
	PAGE_SELECTOR: '#page'
	GRID_SIZE: [20, 20]

	widgets: []

	init: ->
		$ =>
			@bindEvents()
			@load()

	bindEvents: ->
		$('#add').click => @addWidget()
		$('#save').click => @save()
		$('#clear').click => @clear()

	addWidget: (widgetConfig={}) ->
		widget = new Widget(widgetConfig)
		@widgets.push(widget)
		widget.render()

	load: ->
		template = store.get('test1')
		for widgetConfig in template.layout
			@addWidget(widgetConfig)

	save: ->
		store.set('test1', @serialize())

	clear: ->
		store.clear()

	serialize: ->
		layout = (widget.serialize() for widget in @widgets)
		{ layout: layout }
}


App.init()