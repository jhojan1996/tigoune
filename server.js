const express = require('express');


const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res)=>{
	res.render('index', {title: 'Home'});
})


app.listen(process.env.PORT || 3000, ()=>{
	console.log("app listen on port: 3000");
});