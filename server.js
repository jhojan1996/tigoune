const express = require('express');
const bodyParser = require('body-parser');
const recargas = require('./actions/recargas');


const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json({limit: "100mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

app.use(express.static('public'));

app.get('/', (req, res)=>{
	res.render('index', {title: 'Home'});
})

app.get('/listen/:product', (req, res)=>{
	res.render('index');
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
    }
});

app.listen(process.env.PORT || 3000, ()=>{
	console.log("app listen on port: 3000");
});//prueba