
if (localStorage.getItem('trucode_token') != undefined) {
	document.getElementById('signinreg').style.display = 'none';
	document.getElementById('signoutuse').style.display = 'inline';
	document.getElementById('profile').innerHTML = localStorage.getItem('trucode_username');
}

var signout = function() {
	localStorage.removeItem('trucode_token');
	localStorage.removeItem('trucode_username');
	document.getElementById('signinreg').style.display = 'inline';
	document.getElementById('signoutuse').style.display = 'none';
}
