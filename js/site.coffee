generateGuid = ->
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
		r = Math.random() * 16 | 0
		v = if c is 'x' then r else (r & 0x3|0x8)
		v.toString(16)

addWidget = ->
	guid = generateGuid()
	$('#page').append("""<div data-guid="#{guid}" class="widget"></div>""")
	enableWidget(guid)

enableWidget = (guid) ->
	console.log "enabling #{guid}"
	widget = $("[data-uid='#{guid}']")
	grid = [20, 20]
	widget.resizable({grid: grid, containment: "#page"})
	widget.draggable({grid: grid, containment: "#page"})

$ -> $('#add').click(addWidget)
