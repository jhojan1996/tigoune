const request = require('request');
exports.recargas = (req, res)=>{
	console.log('***** recargas *****');
    let json;
    for (let i = 0; i < req.body.result.contexts.length; i++) {
        if(req.body.result.contexts[i].name === "recargastep" || req.body.result.contexts[i].name === "recarga"){
            json = req.body.result.contexts[i].parameters;
            break;
        }
    }
    
    const valorRecarga = (typeof json.valorRecarga !== 'undefined') ? json.valorRecarga.number : "";
    const numeroCelular = (typeof json.numeroCelular !== 'undefined') ? json.numeroCelular : "";
    const confirmRecarga = (typeof json.confirmRecarga !== 'undefined') ? json.confirmRecarga : "";
    const numeroCuenta = (typeof json.numeroCuenta !== 'undefined') ? json.numeroCuenta.number : "";
    let text;

    if(valorRecarga !== ''){
        console.log("Valor recarga enviado =====>", valorRecarga);
        if(numeroCelular !== ''){
            console.log("Numero celular ======>", numeroCelular);
            if(confirmRecarga !== ''){
                if(confirmRecarga === 'si'){
                	if(numeroCuenta){
                		text = `Tu recarga fue realizada con éxito`;
                        request({
                            url: 'https://api.dialogflow.com/v1/contexts?sessionId=yaydevdiner',
                            method: 'DELETE',
                            headers: {
                                "Authorization": "Bearer 8cd79128d3d946f085969c75ea181633",
                                "Content-Type": "application/json"
                            }
                        }, (error, response) => {
                            if (error) {
                                console.log('Error sending message: ', error);
                            } else if (response.body.error) {
                                console.log('Error: ', response.body.error);
                            } else {
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
                		text = `Para finalizar tu compra, por favor dime la clave de 4 dígitos de tu cuenta Bancolombia`;
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: {
                                text: text
                            },
		                    source: 'recarga'
		                });
                	}                     
                }else{
                    text = `La recarga no fue realizada, ¿qué más deseas hacer?`;
                    request({
                        url: 'https://api.dialogflow.com/v1/contexts?sessionId=yaydevdiner',
                        method: 'DELETE',
                        headers: {
                            "Authorization": "Bearer 8cd79128d3d946f085969c75ea181633",
                            "Content-Type": "application/json"
                        }
                    }, (error, response) => {
                        if (error) {
                            console.log('Error sending message: ', error);
                        } else if (response.body.error) {
                            console.log('Error: ', response.body.error);
                        } else {
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
            }else{
                console.log("Confirmacion no enviada");
                text = `Ok. ¿Deseas realizar una recarga por valor de ${valorRecarga} pesos a tu número de celular ${numeroCelular}?`;
                return res.json({
                    speech: text,
                    displayText: text,
                    messages: {
                        text: text
                    },
                    source: 'recarga'
                });
            }
        }else{
            console.log("numero celular no enviado");
            text = `¿Cual es el número de celular al que deseas realizar la recarga?`; 
            return res.json({
                speech: text,
                displayText: text,
                messages: {
                    text: text
                },
                source: 'recarga'
            });
        }
    }else{
        console.log("Valor recarga no enviada");
        text = `Hola. Para iniciar tu recarga necesitamos saber la siguiente información. ¿cuanto deseas recargar?`;
        return res.json({
            speech: text,
            displayText: text,
            messages: {
                text: text
            },
            source: 'recarga'
        });
    }
}