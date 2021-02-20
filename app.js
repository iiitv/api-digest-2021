const express = require('express');
const request = require('request');
const hbs =  require('hbs');
const bodyparser = require('body-parser');
const app =express();
const path = require('path');
// var railway = require('railway-api')

const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))


app.set('views',path.join(__dirname,'templates/views'));
app.set('view engine','hbs');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use(app.router);
// routes.initialize(app);

// app.use('/',require('./routes/pages'));

app.get('/', function(req,res){
    // res.render('index');
    res.render('homescreen')
});

// app.get('/', function(req,res){
//     // res.render('index');
//     res.render('homescreen')
// });

// railway.setApikey('72a4b65e030c0f6316343d8564fe3e34')

app.post('/check',function(req,res)
{
    // railway.checkPnr('<10 digit pnr>', function (err, res) {})
    // railway.name_number(req.body.trainnumber, function (err, res) {

    //     console.log(res);
    // })

    var searchh = req.body.trainnumber;
    console.log(searchh);
    const options = {
  method: 'POST',
  url: 'https://trains.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-key': '11d26b13d3msh0c0e1f0eafa7297p1584a8jsn4c256b77a0d2',
    'x-rapidapi-host': 'trains.p.rapidapi.com',
    useQueryString: true
  },
  body: {search: searchh},
  json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
    res.send(body);
});

})



app.listen(port,()=>{
    console.log(`servewr is on port ${port}`);
});

// module.exports = app;