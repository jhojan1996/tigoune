var accessToken = "8cd79128d3d946f085969c75ea181633",
developerToken = "492c21e9cf5d47bbb94f6dcbdce5b1b8",
baseUrl = "https://api.dialogflow.com/v1/",
v = "20170516",
$speechInput,
$recBtn,
recognition,
messageRecording = "Escuchando...",
messageCouldntHear = "No pude oirte, ¿Puedes decirlo de nuevo?",
messageInternalError = "Oh no! Ha habido un error interno, intentalo nuevamente",
messageSorry = "Lo siento, no tengo una respuesta a esto";
$(document).ready(function() {
    $speechInput = $("#speech");
    $recBtn = $("#rec");
    $speechInput.keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $recBtn.on("click", function(event) {
        switchRecognition();
    });
});

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = function(event) {
        respond(messageRecording);
        updateRec();
    };
    recognition.onresult = function(event) {
        recognition.onend = null;

        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        send(text);
        stopRecognition();
    };
    recognition.onend = function() {
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
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function send(text) {
    console.log(text);
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v="+v,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + developerToken
        },
        data: JSON.stringify({query: text, lang: "es", sessionId: "yaydevdiner"}),
        success: function(data) {
            prepareResponse(data);
        },
        error: function() {
            respond(messageInternalError);
        }
    });
}
function prepareResponse(val) {
    var spokenResponse = val.result.fulfillment.speech;
    respond(spokenResponse);
}

function respond(val) {
    if (val == "") {
        val = messageSorry;
    }
    if (val !== messageRecording) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "es-COL";
        window.speechSynthesis.speak(msg);
    }
    $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
}