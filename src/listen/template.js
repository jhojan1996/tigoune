import yo from 'yo-yo';
import layout from '../layout';

export default function userPageTemplate(action){
	var el = yo`
	<div class='container timeline'>
		<div class='bg'>
			<div class='nav-content'>
				<nav>
					<div class="nav-wrapper custom-bg">
				  		<a href="#!" class="logo-tigo"><img src='/images/tigo.png' class='logo-tigo' /></a>
				  		<ul class="right hide-on-med-and-down icon-size">
				    		<li><a href="#"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a></li>
				    		<li><a href="/"><i class="fa fa-times" aria-hidden="true"></i></a></li>
				  		</ul>
					</div>
				</nav>
			</div>
			<div class='dialog-container'>
				<div class='dialog' id='dialog'></div>
			</div>
			<div class='rec-btn2'>
				<div class='micr' id='rec' onclick=${switchRecognition}><i class="fa fa-microphone" aria-hidden="true"></i></div>
			</div>
		</div>
	</div>
	`;

	const v = "20170516";
	const accessToken = "8cd79128d3d946f085969c75ea181633";
	const developerToken = "492c21e9cf5d47bbb94f6dcbdce5b1b8";
	const baseUrl = "https://api.dialogflow.com/v1/";
	let messageRecording = "Escuchando...";
	let messageCouldntHear = "No pude oirte, ¿Puedes decirlo de nuevo?";
	let messageInternalError = "Oh no! Ha habido un error interno, intentalo nuevamente";
	let messageSorry = "Lo siento, no tengo una respuesta a esto";
	let recognition;
	let setAct = "";
	let setPar = "";
	const actions = {
		recarga: "Recargar",
		info: "Pregunta"
	};

	$(document).ready(function() {
		window.speechSynthesis.cancel();
		send(actions[action]);
	});

	function startRecognition() {
	    recognition = new webkitSpeechRecognition();
	    recognition.continuous = false;
	    recognition.interimResults = false;
	    recognition.onstart = function(event) {
	        respond(messageRecording);
	    };
	    recognition.onresult = function(event) {
	    	$("#rec").removeClass("micr-en");
	        recognition.onend = null;

	        var text = "";
	        for (var i = event.resultIndex; i < event.results.length; ++i) {
	            text += event.results[i][0].transcript;
	        }

	        console.log("Events.results ------------------>", event.results);

	        setUserConversation(text);
	        send(text);
	        stopRecognition();
	    };
	    recognition.onend = function() {
	    	$("#rec").removeClass("micr-en");
	    	setMachineConversation(messageCouldntHear);
	        respond(messageCouldntHear);
	        stopRecognition();
	    };
	    recognition.lang = "es-COL";
	    recognition.start();
	}

	function stopRecognition() {
	    if (recognition) {
	        recognition.stop();
	        recognition = null;
	    }
	}
	function switchRecognition() {
		$("#rec").addClass("micr-en");
	    if (recognition) {
	        stopRecognition();
	    } else {
	        startRecognition();
	    }
	}

	function send(text) {
	    fetch(`${baseUrl}query?v=${v}`,{
	    	method: "POST",
	    	headers: {
	    		'Content-Type': 'application/json; charset=utf-8',
			    'Authorization': 'Bearer ' + developerToken
			},
			body: JSON.stringify({query: text, lang: "es", sessionId: "yaydevdiner"})
	    })
	    .then(res=>res.json())
	    .then(data=>prepareResponse(data))
	    .catch(error=>{
	    	console.log(error);
	    	respond("Oh no! Ha habido un error interno, intentalo nuevamente");
	    });
	}
	function prepareResponse(val) {
		console.log("VAL---------->",val)
	    var spokenResponse = val.result.fulfillment.speech;
	    setAct = val.result.action;
	    setPar = val.result.parameters;
	    respond(spokenResponse);
	}

	function respond(val, text="") {
	    if (val == "") {
	        val = messageSorry;
	    }
	    if (val !== messageRecording) {
	    	window.utterances = [];
	        const msg = new SpeechSynthesisUtterance();
	        const voices = window.speechSynthesis.getVoices();
	        msg.voiceURI = "native";
	        msg.text = val;
	        msg.lang = "es-US";
	        msg.voice = voices[7];
	        msg.onstart = event=>{
	        	console.log("getVoices----------->", window.speechSynthesis.getVoices());
	        	console.log("Empece a hablar");
	        };
	        msg.onend = event=>{
	            console.log("termine de hablar");
	            if(text !== ""){
	            	send(text);
	            }	           	
	        };
	        window.utterances.push(msg);
	    	window.speechSynthesis.speak(msg);

	    	setMachineConversation(val);
	    }
	}

	function setUserConversation(text){
		$("#dialog").append(`<div class='user'>${text}</div>`);
	}

	function setMachineConversation(text){
		$("#dialog").append(`<div class='machine'>${text}</div>`);
	}

	return layout(el);
}