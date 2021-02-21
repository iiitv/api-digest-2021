const express = require('express');
const router  = express.Router();
const bcrypt =  require('bcryptjs')
const request = require('request');
const { json } = require('express');

router.post('/check',function(req,res)
{
  var source  = req.body.from;
  var destination = req.body.to;
  console.log(source);
  console.log(destination);

  _External_URL = `https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/72a4b65e030c0f6316343d8564fe3e34/StationCode/${source}/`;
  request(_External_URL , {json: true}, (err,res,body) => {
  if(err)
  {
      console.log(err);
  }
  else
  {
    const trainsFromStation = body;
    var trainnumberlist = [];
    var k=0;
    for(var i=0;i<trainsFromStation.Trains.length;i++)
    {
      if(trainsFromStation.Trains[i].Destination==destination && trainsFromStation.Trains[i].Source==source)
      {
        console.log(trainsFromStation.Trains[i]);
        trainnumberlist[k] = trainsFromStation.Trains[i].TrainNo;
        k=k+1;
      }
            
    }

    for(var j=0;j<trainnumberlist.length;j++)
    {
      _Extern_URL = `https://indianrailapi.com/api/v2/TrainSchedule/apikey/72a4b65e030c0f6316343d8564fe3e34/TrainNumber/${trainnumberlist[j]}/`;
      request(_Extern_URL , {json: true}, (err1,res1,body1) => {
      if(err1)
      {
          console.log(err);
      }
      else
      {
        const trainStationsList = body1.Route;
        var soudis;
        var destdis;
        for(var qq=0;qq<trainStationsList.length;qq++)
        {
          if(trainStationsList[qq].StationCode == source)
          {
            soudis  =trainStationsList[qq].Distance;
          }
          if(trainStationsList[qq].StationCode == destination)
          {
            destdis = trainStationsList[qq].Distance;
          }
        }
              
        var dist = parseInt(destdis) - parseInt(soudis);
        console.log(dist);
        var lowestdistance = (dist*0.4)+parseInt(soudis);
        var maximumdistance  = (dist*0.7) + parseInt(soudis);
        var possiblestation = [];
        var possiblestationtime = []; 
        var mm=0;
        for(var m = 0 ; m< trainStationsList.length; m++)
        {
          if(trainStationsList[m].Distance >= lowestdistance && trainStationsList[m].Distance <= maximumdistance)
          {
            possiblestation[mm]=trainStationsList[m].StationCode;
            var timefirst = trainStationsList[m].ArrivalTime;
            var  timesecond  = trainStationsList[m].DepartureTime;
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
            }    
          }
        }    
        console.log(possiblestation);
        console.log(possiblestationtime);        
        for(var stt = mm-1;stt>=0;stt--)
        {
          var findtrain = possiblestation[stt];
          for(var ilt=0;ilt<trainsFromStation.Trains.length;ilt++)
          {
            if(trainsFromStation.Trains[ilt].Destination==findtrain)
            {
              if(trainsFromStation.Trains[ilt].Source==source)
              {  
                console.log(findtrain);
                console.log(trainsFromStation.Trains[ilt])
              }    
            }
          }     
        }
      }});  
    }
  }});
});
module.exports = router;

function middle(findtrain,destination){
  _Exter_URL = `https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/72a4b65e030c0f6316343d8564fe3e34/StationCode/${findtrain}/`;
  request(_Exter_URL , {json: true},  (err2,res2,body2) => {
  if(err2)
  {
    console.log(err2);
  }
  else
  {
    const trainsFromMid = body2;
    const trainsmidlist=[];
    var s=0;
    for(var ilt1=0;ilt1<trainsFromMid.Trains.length;ilt1++)
    {
      if(trainsFromMid.Trains[ilt1].Source==findtrain && trainsFromMid.Trains[ilt1].Destination==destination)
      {
        console.log(findtrain);
        trainsmidlist[s]=trainsFromMid.Trains[ilt1];
        console.log(trainsmidlist[s]);
        s++;
      } 
    }
  }});
}