function getGUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

function enableWidget(guid) {
	var widget = $("[data-guid='" + guid + "']")

	var grid = [20, 20];
	widget.resizable({grid: grid, containment: "#page"});
	widget.draggable({grid: grid, containment: "#page"});
}

$(function() {
	
	$('#add').click(function() { 
		var guid = getGUID();
		$('#page').append('<div data-guid="' + guid + '" class="widget"></div>');
		enableWidget(guid);
	});

	// $('#save').click(function() {
	// 	
	// 	var layout = gridster.serialize();

	// 	var template = {
	// 		layout: layout,
	// 		content: content
	// 	};

	// 	store.set(guid, template)
	// 	window.location.href = '/'
	// });
});

// $(function(){
// 	$('#clear').click(function() {
// 		store.clear();
// 		window.location.href = '/'
// 	});	
	
// 	store.forEach(function(key, val) {
// 		var link = "<p><a href=\"report.html?id=" + key + "\">" + key + "</a></p>"
// 		$('#reports').append(link);
// 	})
// });