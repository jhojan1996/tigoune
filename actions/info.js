const request = require('request');
exports.info = (req, res)=>{
	console.log("****** Info *******");
	const json = req.body.result.contexts[0].parameters;
	const pregunta = (typeof json.pregunta !== 'undefined') ? json.pregunta : "";
	const verbo = (typeof json.verbo !== 'undefined') ? json.verbo : "";
	const servicio = (typeof json.servicio !== 'undefined') ? json.servicio : '';
	let text;

	if(pregunta !== ""){
		if(servicio !== ""){
			if(verbo !== ""){
				request({
		            url: 'https://pqbzizwcgs.localtunnel.me/questions',
		            method: 'POST',
		            json: true,
		            body: {
		               pregunta: pregunta,
		               verbo: verbo,
		               servicio: servicio
		            }
		        }, (error, response) => {
		            if (error) {
		                console.log('Error sending message: ', error);
		                text = "Hubo un error tratando de obtener la información. Por favor intentalo de nuevo.";
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            } else if (response.body.error) {
		                console.log('Error: ', response.body.error);
		                text = "Hubo un error tratando de obtener la información. Por favor intentalo de nuevo.";
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            } else {
		                console.log('response-------->', response.body);
		                text = response.body.text;
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            }
		        });
			}else{
				request({
		            url: 'https://pqbzizwcgs.localtunnel.me/questions',
		            method: 'POST',
		            json: true,
		            body: {
		               pregunta: pregunta, 
		               servicio: servicio
		            }
		        }, (error, response) => {
		            if (error) {
		                console.log('Error sending message: ', error);
		                text = "Hubo un error tratando de obtener la información. Por favor intentalo de nuevo.";
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            } else if (response.body.error) {
		                console.log('Error: ', response.body.error);
		                text = "Hubo un error tratando de obtener la información. Por favor intentalo de nuevo.";
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            } else {
		                console.log('response-------->', response.body);
		                text = response.body.text;
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
	                            text: text
	                        },
		                    source: 'recarga'
		                });
		            }
		        });
			}
		}
	}
}