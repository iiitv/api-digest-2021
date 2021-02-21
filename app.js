const express = require('express');
const request = require('request');
const hbs =  require('hbs');
const bodyparser = require('body-parser');
const app =express();
const path = require('path');
// const { url } = require('inspector');
// const fs = require('fs');




// var railway = require('railway-api')

const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,'public')));

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

app.use('/auth',require('./routes/auth'));
// app.get('/', function(req,res){
//     // res.render('index');
//     res.render('homescreen')
// });

// railway.setApikey('72a4b65e030c0f6316343d8564fe3e34')
// railway.checkPnr('<10 digit pnr>', function (err, res) {})
//     railway.name_number(req.body.trainnumber, function (err, res) {

//         console.log(res);
//     })

// var krdosex ="h";
// app.post('/check',function(req,res)
// {
    

//     // var searchh = req.body.trainnumber;
//     var source  = req.body.from;
//     var destination = req.body.to;
//     console.log(source);
//     console.log(destination);
//     // res.send(source + destination);

// _External_URL = `https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/72a4b65e030c0f6316343d8564fe3e34/StationCode/${source}/`;


// var datastd;
// var usedata;
// const  callexternalapi =  (callback) =>
// {
 
//      request(_External_URL , {json: true}, (err,res,body) => {
//     if(err)
//     {
//       console.log(err);
//     }
//     else
//     {
    
//       // datastd = JSON.stringify(body);
//       // usedata = JSON.parse(datastd);
//       const variableName  = body;
//       module.exports = variableName;
//     //  krdosex = `${usedata.Trains[0].TrainNo}`;
//     //  console.log(variableName);
//       // console.log(usedata.Trains[0].TrainNo);
//       // fs.writeFile("json.json",datastd,(err)=>
//       // {
//       //   console.log("done");
//       // })
//       // console.log(datastd); 
//       // res.send(body);
//     }
//   })
 
  
// }
// callexternalapi();


// });
// // console.log(krdosex);


// // }
// //     var datatrain='';
// // var searchh = req.body.from;
// //     const options = {
// //   method: 'POST',
// //   url: 'https://trains.p.rapidapi.com/',
// //   headers: {
// //     'content-type': 'application/json',
// //     'x-rapidapi-key': '11d26b13d3msh0c0e1f0eafa7297p1584a8jsn4c256b77a0d2',
// //     'x-rapidapi-host': 'trains.p.rapidapi.com',
// //     useQueryString: true
// //   },
// //   body: {search: searchh},
// //   json: true
// // };

// // request(options, function (error, response, body) {
// // 	if (error) throw new Error(error);

// // 	console.log(body);
// //   datatrain=body;
// //     // res.send(body);
// // });
// // res.send(datastd);
// // })



app.listen(port,()=>{
    console.log(`servewr is on port ${port}`);
});

module.exports = app;