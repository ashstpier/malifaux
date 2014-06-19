window.Designer = {
	PAGE_SELECTOR: '#page'
	GRID_SIZE: [20, 20]

	widgets: []
	currentEditWidget: null

	init: (templateKey) ->
		@templateKey = templateKey
		$ =>
			Widget.loadAll =>
				@page = $(@PAGE_SELECTOR)
				@renderControls()
				@bindEvents()
				@load()

	renderControls: ->
		for name, className of Widget.WIDGET_NAMES
			$("#toolbar").append("""<button id="add-#{name}" type="button">Add #{name}</button>""")

	bindEvents: ->
		$('#save').click => @save()
		$('#clear').click => @clear()
		@page.click => @clearEditWidget()
		for name, className of Widget.WIDGET_NAMES
			do (className) => $("#add-#{name}").click => @addWidget(type: className)

	addWidget: (widgetConfig={}) ->
		widget = new Widget(widgetConfig)
		@widgets.push(widget)
		@page.append(widget.render())

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


$ -> Designer.init('my-test-template')