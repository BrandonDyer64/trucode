$(function() {
	$(document).on('submit', '#search_form', function() {
		var query = $.trim($("#search_query").val());
		console.log("posting");
		$.post(HOST + "/search_projects.php",{
			query: query,
		},
		function(data){
			console.log(data);
			var json = JSON.parse(data);
			if (json.success) {
				var results = json.results;
				var doc = document.getElementById('results');
				doc.innerHTML = '';
				for (x in results) {
					doc.innerHTML += ('<a href="../code/?proj=' + results[x].username + '@' + results[x].projname + '">' + results[x].projname);
					doc.innerHTML += ('</a> by <a>' + results[x].username + '</a><br>');
				}
			} else {
				console.log('Somehow, something went wrong');
			}
		});
	});
});
$.post(HOST + "/search_projects.php",{
	query: '',
},
function(data){
	console.log(data);
	var json = JSON.parse(data);
	if (json.success) {
		var results = json.results;
		var doc = document.getElementById('results');
		doc.innerHTML = '';
		for (x in results) {
			doc.innerHTML += ('<a href="../code/?proj=' + results[x].username + '@' + results[x].projname + '">' + results[x].projname);
			doc.innerHTML += ('</a> by <a>' + results[x].username + '</a><br>');
		}
	} else {
		console.log('Somehow, something went wrong');
	}
});
