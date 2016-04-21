$(function() {
	$(document).on('submit', '#register', function() {
		var username = $.trim($("#username").val());
		var password = $.trim($("#password").val());
		console.log("posting");
		$.post(HOST + "/signin.php",{
			username: username,
			password: password,
		},
		function(data){
			console.log(data);
			var json = JSON.parse(data);
			if (json.success) {
				localStorage.setItem('trucode_token', json.token);
				localStorage.setItem('trucode_username', username);
				window.location.href = '../';
			} else {
				document.getElementById('error').innerHTML = json.error;
				document.getElementById('showerror').style.display = "inline";
			}
		});
	});
});
