const express = require('express');
const router  = express.Router();
const bcrypt =  require('bcryptjs')
const request = require('request');
const { json } = require('express');



router.post('/check',function(req,res)
{
    

    // var searchh = req.body.trainnumber;
    var source  = req.body.from;
    var destination = req.body.to;
    console.log(source);
    console.log(destination);
    // res.send(source + destination);

_External_URL = `https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/72a4b65e030c0f6316343d8564fe3e34/StationCode/${source}/`;


var datastd;
var usedata;
const  callexternalapi =  (callback) =>
{
 
     request(_External_URL , {json: true}, (err,res,body) => {
    if(err)
    {
      console.log(err);
    }
    else
    {
    
      
      // datastd = JSON.stringify(body);
      // usedata = JSON.parse(datastd);
      const variableName  = body;
      var trainnumberlist = [];
      var k=0;
    //   console.log(variableName.Trains.length);
      for(var i=0;i<variableName.Trains.length;i++)
      {
        if(variableName.Trains[i].Destination== destination)
        {
          
            console.log(variableName.Trains[i])
            trainnumberlist[k] = variableName.Trains[i].TrainNo;
            k=k+1;
          }
          
       }

       
     for(var j=0;j<trainnumberlist.length;j++)
     {
        console.log(trainnumberlist[j]);
         _Extern_URL = `https://indianrailapi.com/api/v2/TrainSchedule/apikey/72a4b65e030c0f6316343d8564fe3e34/TrainNumber/${trainnumberlist[j]}/`;
         request(_Extern_URL , {json: true}, (err,res,body) => {
          if(err)
          {
            console.log(err);
          }
          else
          {
                console.log(body);
          }
        })
     }
   
    }
})
  
}
callexternalapi();


});

module.exports = router;