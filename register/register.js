$(function() {
	$(document).on('submit', '#register', function() {
		var username = $.trim($("#username").val());
		var password = $.trim($("#password").val());
		var passconf = $.trim($("#username").val());
		var firstname = $.trim($("#firstname").val());
		var lastname = $.trim($("#lastname").val());
		console.log("posting");
		$.post(HOST + "/register.php",{
			username: username,
			password: password,
			passconf: passconf,
			firstname: firstname,
			lastname: lastname
		},
		function(data){
			console.log(data);
			var json = JSON.parse(data);
			if (json.success) {
				window.location.href = '../signin';
			} else {
				document.getElementById('error').innerHTML = json.error;
				document.getElementById('showerror').style.display = "inline";
			}
		});
	});
});
