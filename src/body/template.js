import yo from 'yo-yo';
import layout from '../layout';

export default function body(){
	var el =  yo`
	<div class='container'>
		<div class='bg'>
			<div class='index-content'>
				<div class='main-title'>TigoVOZ</div>
				<div class='submain-title'>Inteligencia artificial / Lenguaje natural</div>
				<div class='rec-btn'>
					<div class='micr' id='rec' onclick=${switchRecognition}><i class="fa fa-microphone" aria-hidden="true"></i></div>
				</div>
				<div class='action-content'>
					<section>
						<div class='submain-title border-bottom padd'>Experiencias</div>					
						<div class='padd border-bottom' id='act1'><a href='#'>Compra Internet <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
						<div class='padd border-bottom' id='act2'><a href='/listen/recarga'>Recarga <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
						<div class='padd border-bottom' id='act3'><a href='/listen/info'>Informacion de producto <i class="fa fa-arrow-right pos-right alpha" aria-hidden="true"></i></a></div>
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
	        msg.voiceURI = "native";
	        msg.text = val;
	        msg.lang = "es-COL";
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
