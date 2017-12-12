import yo from 'yo-yo';
import layout from '../layout';

export default function userPageTemplate(plan){
	var opc = [
		{
			dialogflow: "hola tigo",
			text: "Hola! Bienvenido a tigo voz"
		},
		{
			dialogflow: "Recargar 5000",
			text: "Hola! Veo que quieres recargar $5000"
		},
		{
			dialogflow: "Recargar 20000",
			text: "Hola! Veo que quieres recargar $5000"
		},
		{
			dialogflow: "Recargar 30000",
			text: "Hola! Veo que quieres recargar $5000"
		}
	];

	var el = yo`
	<div class='container'>
		<div class='bg'>
			<div class='logo-tigo'>
				<img src='/images/tigo.png'>
			</div>
			<div class='dialog-container'>
				<div class='dialog'>
					Perfecto Ana, tu<br> plan de 10 MEGAS de internet<br> quedara activo con tu pago de $70.900
				</div>
			</div>
			<div class='clear'></div>
			<div class='rec-btn'>
				<div class='micr' id='rec' onclick=${switchRecognition}><i class="fa fa-microphone" aria-hidden="true"></i></div>
				<div class='btn-text'><b>Contectado a TIGO</b></div>
			</div>
		</div>
	</div>
	`;

	var v = "20170516";
	var accessToken = "8cd79128d3d946f085969c75ea181633";
	var developerToken = "492c21e9cf5d47bbb94f6dcbdce5b1b8";
	var baseUrl = "https://api.dialogflow.com/v1/";
	var messageRecording = "Escuchando...";
	var messageCouldntHear = "No pude oirte, ¿Puedes decirlo de nuevo?";
	var messageInternalError = "Oh no! Ha habido un error interno, intentalo nuevamente";
	var messageSorry = "Lo siento, no tengo una respuesta a esto";
	var recognition;

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
	        send(text);
	        stopRecognition();
	    };
	    recognition.onend = function() {
	    	$("#rec").removeClass("micr-en");
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

	function respond(val, text) {
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
	           	send(text);
	        };
	        window.utterances.push(msg);
        	window.speechSynthesis.speak(msg);
	    }
	}

	respond(opc[plan].text, opc[plan].dialogflow);

	return layout(el);
}

	