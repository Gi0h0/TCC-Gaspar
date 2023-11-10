
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('firebase-admin');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

const serviceAccount = require('./reclamacoes-a4e5b-firebase-adminsdk-bf0mt-c62eda16e9.json');

fs.initializeApp({
    credential : fs.credential.cert(serviceAccount)
});

const db = fs.firestore();
const reclameDb = db.collection('reclame');

app.listen(3000, function(){
    console.log('Estou na Porta 3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/reclame.html');
});

app.post('/reclame', function(req, res){
    const dados = req.body;
    reclameDb.add(dados);
});

