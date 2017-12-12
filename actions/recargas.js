exports.recargas = (req, res)=>{
	console.log('***** recargas *****');
    const numeroCelular = (typeof req.body.result.contexts[0].parameters.numero_celular !== 'undefined') ? req.body.result.contexts[0].parameters.numero_celular : '';
    const valorRecarga = (typeof req.body.result.contexts[0].parameters.valor_recarga.number !== 'undefined') ? req.body.result.contexts[0].parameters.valor_recarga.number: '';
    const claveCuenta = (typeof req.body.result.contexts[0].parameters.clave_cuenta !== 'undefined') ? req.body.result.contexts[0].parameters.clave_cuenta : '';
    const confirm = (typeof req.body.result.contexts[0].parameters.confirm_recarga !== 'undefined') ? req.body.result.contexts[0].parameters.confirm_recarga : '';
    let response;
    let text;
    let setContext;

    if(valorRecarga){
        console.log("Valor recarga enviado =====>", valorRecarga);
        if(numeroCelular){
            console.log("Numero celular ======>", numeroCelular);
            if(confirm){
                if(confirm === 'si' || confirm === 'sí'){
                	if(claveCuenta){
                		text = `Tu recarga fue realizada con exito`;
                		setContext = [{"name":"recarga", "lifespan":0, "parameters":{}}];
                		response = {
                            text: text
                        };
                        return res.json({
                            speech: text,
                            displayText: text,
                            messages: response,
                            contextOut: setContext,
                            source: 'recargas'
                        });
                	}else{
                		text = `Para finalizar tu compra, por favor ingresa tu clave de 4 digitos en la caja de texto`;
                		 setContext = [
		                    {
		                        "name":"recarga", 
		                        "lifespan":1, 
		                        "parameters":{
		                            "numero_celular": numeroCelular, 
		                            "valor_recargar": {"number":valorRecarga}, 
		                            "confirm_recarga": confirm,
		                            "clave_cuenta": ""
		                        }
		                    }
		                ];
		                response = {
		                    text: text
		                }; 
		                return res.json({
		                    speech: text,
		                    displayText: text,
		                    messages: response,
		                    contextOut: setContext,
		                    source: 'recarga'
		                });
                	}                     
                }else{
                    text = `La recarga no fue realizada, ¿qué más deseas hacer?`;
                    setContext = [{"name":"recarga", "lifespan":0, "parameters":{}}];
                    response = {
                        text: text
                    };
                    return res.json({
                        speech: text,
                        displayText: text,
                        messages: response,
                        contextOut: setContext,
                        source: 'recarga'
                    });
                }
            }else{
                console.log("Confirmacion no enviada");
                text = `Ok. ¿Deseas realizar una recarga por valor de $${valorRecarga} a tu número de celular ${numeroCelular}?`;
                setContext = [
                    {
                        "name":"recarga", 
                        "lifespan":1, 
                        "parameters":{
                            "numero_celular": numeroCelular, 
                            "valor_recargar": {"number":valorRecarga}, 
                            "confirm_recarga": "",
                            "clave_cuenta": ""
                        }
                    }
                ];
                response = {
                    text: text
                };  
                return res.json({
                    speech: text,
                    displayText: text,
                    messages: response,
                    contextOut: setContext,
                    source: 'recarga'
                });
            }
        }else{
            console.log("numero celular no enviado");
            text = `¿Cual es el número de celular al que deseas realizar la recarga?`;
            setContext = [
                {
                    "name":"recarga", 
                    "lifespan":1, 
                    "parameters":{
                        "numero_celular": "", 
                        "valor_recargar": {"number":valorRecarga}, 
                        "confirm_recarga": "",
                        "clave_cuenta": ""
                    }
                }
            ];
            response = {
                text: text
            };  
            return res.json({
                speech: text,
                displayText: text,
                messages: response,
                contextOut: setContext,
                source: 'recarga'
            });
        }
    }else{
        console.log("Valor recarga no enviada");
        text = `¿Cual es el valor de la recarga?`;
        setContext = [
            {
                "name":"recarga", 
                "lifespan":1, 
                "parameters":{
                    "numero_celular": "", 
                    "valor_recargar": "", 
                    "confirm_recarga": "",
                    "clave_cuenta": ""
                }
            }
        ];
        response = {
            text: text
        };  
        return res.json({
            speech: text,
            displayText: text,
            messages: response,
            contextOut: setContext,
            source: 'recarga'
        });
    }
}