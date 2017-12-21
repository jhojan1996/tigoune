const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const recargas = require('./actions/recargas');
const info = require('./actions/info');


const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json({limit: "100mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

app.use(express.static('public'));

app.get('/', (req, res)=>{
	res.render('index');
})

app.get('/listen/:action', (req, res)=>{
	res.render('index');
});

app.get('/plan', (req, res)=>{
    res.render('index');
});

app.post('/questions', (req, res)=>{
    let questionType = req.body.pregunta;
    let action = (typeof req.body.verbo !== 'undefined') ? req.body.verbo : "";
    let service = req.body.servicio;
    let response;
    let services = [
        {
            name:"internet",
            info:"Para obtener internet debes llamar a la linea 4541654",
            hasAdition: false,
            adition: false
        },
        {
            name:"roaming",
            info: "Roaming internacional Tigo te permite realizar y recibir llamadas, enviar mensajes de texto y navegar en Internet mientras estas en otro país",
            hasAdition: true,
            adition: {
                text: "Puedes ingresar a la pagina de Tigo en el apartado de Roaming para obtener mas información al respecto"
            }
        }
    ];

    for (let i = 0; i < services.length; i++) {
        if(services[i].name === service){
            response = {
                text: services[i].info
            };
            break;
        }
    }

    res.send(response);
});

app.post('/ai', (req, res)=>{
	console.log('*** Webhook for dialogflow.com ***');

    //general variables for every action//
    
    console.log("req.body", req.body.result);

    let action = req.body.result.action;
    let sessionId = req.body.sessionId;
    //---------------------------------//

    switch (action) {
        case 'recarga':
           console.log("Inicio recargas");
           recargas.recargas(req, res);
        break;

        case 'info':
            console.log("Inicio info");
            info.info(req, res);
        break;
    }
});

app.listen(process.env.PORT || 3000, ()=>{
	console.log("app listen on port: 3000");
});//prueba