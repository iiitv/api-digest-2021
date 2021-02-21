import 'dart:convert';
import 'package:cf_pursuit/widgets/drawer.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class Problem extends StatelessWidget {
  static const routeName = '/performance';

  var rting = 0;
  Set Tags = {};
  List prblms = [];
  Future<dynamic> getTags(String handle) async {
    var result = await http.get(
        'https://codeforces.com/api/user.status?handle=$handle&from=1&count=10');
    print('fyuuuuuuuuuuuuuuu11111111111111uuu');
    //'https://codeforces.com/api/contest.ratingChanges?contestId=$ID&from=1&count=10');
    if (result.statusCode == 200) {
      var tg = json.decode(result.body) as Map;
      print(tg);
      //  print('fyuuuuuuuuuuuuuuuuuu');
      //  List rt=[];
      tg.forEach((key, value) {
        print("key==>$value");
        if (!(value.toString() == 'OK')) {
          //  print("keyyyyyyyyyyyyyyyyyyyyyy==>$value");
          //#############
          value.forEach((elem) {
            print(elem['problem']['tags'].toString());
            if (!(elem['verdict'] == 'OK') && Tags.length < 100) {
              Tags.addAll(elem['problem']['tags']);

              ////////////////////////
              //        for (var i in Tags)
              //        // {
              // print(i);
              //    st = st + '&'+i.toString();
            }

            //}
          });
          // for (int ii in value) {
          //   print('key====>' + value[0]['id'].toString());
          //   if (!(value[ii]['verdict'] == 'OK') && Tags.length < 100) {
          //     Tags.addAll(value[ii]['problem']['tags']);
          //   }
          // }
          //);

        }
        //rt.add(absolut(value['oldRating']-value['newRating']));
      });
      String st = "";
      var kk = 0;
      for (var i in Tags) {
        //print("f-->");
        //  print(i);
        if (kk < 2) {
          st = st + ';' + i;
          kk++;
        }
      }
      print('https://codeforces.com/api/problemset.problems?tags=' +
          st.substring(1));
      var result1 = await http.get(
          'https://codeforces.com/api/problemset.problems?tags=' +
              st.substring(1));

      if (result1.statusCode == 200) {
        print("fgfff");
        var prb = json.decode(result1.body) as Map;
        print("prrrrrrrr==>" + prb['result'].toString());
        String prlink = 'https://codeforces.com/contest/';
        prb['result'].forEach((key, ele) {
          ele.forEach((elem) {
            print("hettttttt");
            if(prblms.length<=10)
            prblms.add({
               'name':elem['name'].toString(),'link':prlink +
                  elem['contestId'].toString() +
                  '/problem/' +
                  elem['index'].toString()
            });
          });
          ////////////###########
          // prblms.add(prlink +
          //     ele['problems']['contestId'].toString() +
          //     '/problem/' +
          //     ele['problems']['index'].toString());
        });

      //  for (var pp in prblms) print(pp);
      print(prblms.length);
        return result1.body;
      } else
        return Error();

      //    return result.body;
    } else
      return Error();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Problems Recommender'),
      ),
      drawer: appDrawer(context),
      body: FutureBuilder(
          future: getTags('valiant_vidit'),
          builder: (context, check) {
            if (check.hasData) {
              return Container(
                child: Column(
                  children: [
                    FittedBox(child: Text("Recommended questions to do",style:GoogleFonts.openSans(fontSize: 24,color:Colors.teal[300],fontWeight:FontWeight.w600,),),),
                    SizedBox(height: 10,),
                    Container(
                      height:MediaQuery.of(context).size.height*0.8,
                      child: ListView.builder(
                        itemCount: prblms.length,
                        itemBuilder: (BuildContext context, index) {
                          return Card(elevation:5,child: Container(height:50,
                          color:index%2==0?Colors.grey[100]:Colors.white,
                          child: Center(child: Text(prblms[index]['name'],style: GoogleFonts.roboto(fontSize:18,color:Colors.grey[800]),)),),);
                        },
                      ),
                    ),
                  ],
                ),
              );
            }
            return Center(child: CircularProgressIndicator.adaptive());
          }),
    );
  }
}
