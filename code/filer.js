saveCode = function saveCode() {
	var projectTitle = document.getElementById('project_title');
	var projnum = QUERY_STRING.proj;
	if (projnum == undefined) {
		projnum = 0;
	}
	var token = localStorage.getItem('trucode_token');
	if (token == undefined)
		token = 0;
	$.post(HOST + "/save_project.php",{
				token: token, 
				projnum: projnum.toString(),
				projname: projectTitle.value,
				code: myCodeMirror.getValue().toString()
			},
			function(data){
				console.log(data);
				json = JSON.parse(data);
				projnum = json.id;
				if (json.success) {
					window.location.href = "?proj=" + projnum;
				} else {
					println("ERROR SAVING: " + json.error);
				}
	});
}
