<html>
<head>
	<link rel="stylesheet" type="text/css" href="../main_style.css">
	<script src="cm/lib/codemirror.js"></script>
	<link rel="stylesheet" href="cm/lib/codemirror.css">
	<link rel="stylesheet" href="cm/theme/base16-dark.css">
	<script src="cm/mode/javascript/javascript.js"></script>
	<title>Code</title>
</head>
<body oncontextmenu="return false" class="no_selection">
	<div style="display:flex;">
		<div style="width:640;margin-right:20px;">
			<div>
				<div class="runbutts" style="width:640;background-color:#111;margin:10px;">
					<div class="dropdown">
						<button onclick="file()" class="dropbtn">File</button>
						<div id="fileDropdown" class="dropdown-content">
							<a href="#">Save</a>
							<a href="#">Project Page</a>
							<a href="#">Save to PC</a>
						</div>
					</div>
					<script type="text/javascript">
					/* When the user clicks on the button, 
					toggle between hiding and showing the dropdown content */
					function file() {
						document.getElementById("fileDropdown").classList.toggle("show");
					}
					// Close the dropdown menu if the user clicks outside of it
					window.onclick = function(event) {
						if (!event.target.matches('.dropbtn')) {

							var dropdowns = document.getElementsByClassName("dropdown-content");
							var i;
							for (i = 0; i < dropdowns.length; i++) {
								var openDropdown = dropdowns[i];
								if (openDropdown.classList.contains('show')) {
									openDropdown.classList.remove('show');
								}
							}
						}
					}
					</script>
					<button onclick="runcode();">Run</button>
					<button id="buttonPause" onclick="pausecode();">Pause</button>
					<button id="buttonStep" onclick="draw();">Step</button>
					<input type="text" name="title" value="Untitled Project" placeholder="Title"></input>
				</div>
				<canvas id="canvas" width="640" height="400" class="shade" style="background-color:#000;margin-left:10px;border-radius:10px;"></canvas>
			</div>
			<textarea id="console" readonly style="width:640;height:100;background-color:#111;color:white;margin:10px;border-radius:10px;border:none;">Hello from your Console!</textarea>
		</div>
		<div style="flex:1;margin:10px;">
			<textarea id="ceditor" style="background-color:#111;color:white;margin:20px;">
init = function() {
	
}

draw = function() {
	
}</textarea>
			<script type="text/javascript">
			myTextArea = document.getElementById("ceditor");
			var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
				value: myTextArea.value,
				theme: "base16-dark",
				lineNumbers: true,
				matchBrackets: true,
				indentWithTabs: true,
				indentUnit: 4
			});
			</script>
			<div style="<?php
			if (isset($_GET['tut']) && $_GET['tut'] > 0) {
				$tut = $_GET['tut'];
			} else {
				echo "display: none";
				$tut = 1;
			}
			?>">
			<video autoplay width="320" height="240" controls style="">
				<source src="tutorials/<? echo $tut;?>.mkv" type="video/webm"></source>
				<p>Your browser doesn't like the video tag.<br>
				Might we sudgest 
				<a href="https://www.google.com/chrome/browser/desktop/index.html">
					Google Chrome
				</a>
				?</p>
			</video>
		</div>
		</div>
	</div>
	<script type="text/javascript" src="../engine.js"></script>
	<script type="text/javascript">
	systemConsole = document.getElementById("console");
	println = function(string) {
		oldString = systemConsole.innerHTML;
		newString = oldString + "\n>>> " + string;
		systemConsole.innerHTML = newString;
		document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
	}
	sudoPrintln = function(string) {
		console.log(string);
		oldString = systemConsole.innerHTML;
		newString = oldString + "\n" + string;
		systemConsole.innerHTML = newString;
		document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
	}
	clearPrint = function() {
		systemConsole.innerHTML = "";
		document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
	}
	runcode = function() {
		script = myCodeMirror.getValue();
		try {
			var document = undefined;
			var window = undefined;
			eval("var eval = undefined;" + script);
			sudoPrintln("Running...");
			init();
		} catch (e) {
			sudoPrintln(e);
			return;
		}
		running = false;
		pausecode();
	}
	pausecode = function() {
		running = !running;
		if (running) {
			document.getElementById("buttonPause").innerHTML = "Pause";
		} else {
			document.getElementById("buttonPause").innerHTML = "Play";
		}
	}
	</script>
</body>
</html>