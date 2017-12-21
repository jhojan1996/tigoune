import yo from 'yo-yo';
import layout from '../layout';

export default function body(){
	var el =  yo`
	<div class='container'>
		<div class='bg'>
			<div class='index-content'>
				<div class='main-title'>Asistente digital TIGO</div>
				<div class='submain-title'>Desarrollado con inteligencia artificial</div>
				<div class='rec-btn'>
					<div class='micr' id='rec' onclick=${switchRecognition}><i class="fa fa-microphone" aria-hidden="true"></i></div>
				</div>
				<div class='action-content'>
					<section>
						<div class='submain-title border-bottom padd'>Experiencias</div>					
						<div class='padd border-bottom' id='act1'><a href='/plan'>Comprar el servicio de Internet <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
						<div class='padd border-bottom' id='act2'><a href='/listen/recarga'>Recarga el celular <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
						<div class='padd border-bottom' id='act3'><a href='/listen/info'>Obtener información de nuestros productos <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
						<div class='clear'></div>
					</section>
				</div>
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

	$(document).ready(function() {
		window.speechSynthesis.cancel();
		respond("Hola soy el asistente digital de tigo, estoy aquí para ayudarte. Por favor elige una de la siguientes experiencias: Comprar el servicio internet, recarga el celular y obtener información de nuestros productos. Cual deseas elegír.");
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
