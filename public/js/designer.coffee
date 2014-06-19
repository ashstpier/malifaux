window.App = {
	PAGE_SELECTOR: '#page'
	GRID_SIZE: [20, 20]

	widgets: []
	currentEditWidget: null

	init: (templateKey) ->
		@templateKey = templateKey
		$ =>
			@page = $(@PAGE_SELECTOR)
			@bindEvents()
			@load()

	bindEvents: ->
		$('#add-text').click => @addWidget(type: 'TextContent')
		$('#add-image').click => @addWidget(type: 'ImageContent')
		$('#save').click => @save()
		$('#clear').click => @clear()
		@page.click => @clearEditWidget()

	addWidget: (widgetConfig={}) ->
		widget = new Widget(widgetConfig)
		@widgets.push(widget)
		widget.render()

	clearEditWidget: ->
		if @currentEditWidget
			@currentEditWidget.layoutMode()
			@currentEditWidget = null

	editWidget: (widget) ->
		@clearEditWidget()
		@currentEditWidget = widget
		widget.editMode()

	removeWidget: (widget) ->
		widget.remove()
		@widgets = (w for w in @widgets when w.guid != widget.guid)

	load: ->
		template = store.get(@templateKey)
		if template
			for widgetConfig in template.layout
				@addWidget(widgetConfig)

	save: ->
		store.set(@templateKey, @serialize())

	clear: ->
		@removeWidget(widget) for widget in @widgets
		store.remove(@templateKey)

	serialize: ->
		layout = (widget.serialize() for widget in @widgets)
		{ layout: layout }
}


$ -> App.init('my-test-template')