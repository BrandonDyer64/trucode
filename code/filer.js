saveCode = function saveCode() {
	var projectTitle = document.getElementById('project_title');
	window.location.href = "#/?proj=" + projectTitle.value;
}