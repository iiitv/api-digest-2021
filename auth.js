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
               const variabletrainstation = body.Route;
              //  console.log(variabletrainstation);
               const dist = variabletrainstation[variabletrainstation.length-1].Distance;
               console.log(dist);

               var lowestdistance = (dist*0.4);
               var maximumdistance  = (dist*0.7);
                var possiblestation = [];
                var possiblestationtime = []; 
                var mm=0;
              for(var m = 0 ; m< variabletrainstation.length; m++)
              {
                if(variabletrainstation[m].Distance >= lowestdistance && variabletrainstation[m].Distance <= maximumdistance)
                {
                         possiblestation[mm]=variabletrainstation[m].StationCode;
                         var timefirst = variabletrainstation[m].ArrivalTime;
                         var  timesecond  = variabletrainstation[m].DepartureTime;

                         var af = timefirst.split(':'); // split it at the colons
                         var bf = timesecond.split(':');
                         var minutesfirst = (+af[0]) * 60 + (+af[1]);
                         var minutesecond  =  (+bf[0]) * 60 + (+bf[1]);



                        possiblestationtime[mm] = (minutesecond-minutesfirst);
                         mm++;
                }
              }
            for (var inn=0; inn < mm-1; inn++)      
              {
              // Last i elements are already in place  
              for ( var jn = 0; jn < mm-inn-1; jn++) 
              { 
                  if (possiblestationtime[jn] > possiblestationtime[jn+1])  
                  {
                    var temp = possiblestationtime[jn];
                    possiblestationtime[jn] = possiblestationtime[jn+1];
                    possiblestationtime[jn+1]=temp;


                    var tempn = possiblestation[jn];
                    possiblestation[jn] = possiblestation[jn+1];
                    possiblestation[jn+1]=tempn;
                    // swap(&arr[j], &arr[j+1]);  
                  }
                      
              }
            }
              console.log(possiblestation);
              console.log(possiblestationtime);
              
              

                // console.log(body.Route[]);
          }
        })
     }
      

    }
})
  
}
callexternalapi();


});

module.exports = router;