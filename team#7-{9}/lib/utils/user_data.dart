import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class UserData {
  Map<String, dynamic> r = {};
  static List<Map<String, dynamic>> rankinfo = [];
  static List contst = [];
  static Map newMappk;

  Future<dynamic> checkUser(String name) async {
    print("-->");
    print(name);
    var result =
        await http.get("https://codeforces.com/api/user.info?handles=$name");
    if (result.statusCode == 200) {
      r = json.decode(result.body) as Map<String, dynamic>;
      // print(r.toString());
      // print("<__>" + r["result"][0]["handle"].toString());
      return r["result"][0]["handle"].toString() == "NULL" ? false : true;
    } else {
      return false;
    }
  }

  Future<dynamic> getUserData(String userName) async {
    var result = await http
        .get("https://codeforces.com/api/user.info?handles=$userName");
    submitUserData(userName);
    if (result.statusCode == 200) {
      print(result.toString());
      return result.body;
    } else {
      return "Error()";
    }
  }

  Future<void> submitUserData(String userName) async {
    var result = await http.put(
        "https://cf-pursuit-default-rtdb.firebaseio.com/users/$userName.json",
        body: json.encode({
          "userName": userName,
          "timestamp": DateTime.now().millisecondsSinceEpoch
        }));
    if (result.statusCode == 200) {
      print("hurray!User details added successfully!!");
    } else {
      print("nope,error in adding user to database");
    }
  }

  Future<dynamic> getDBUserData() async {
    var result = await http.get(
      "https://cf-pursuit-default-rtdb.firebaseio.com/users.json",
    );
    // final extractedData = json.decode(result.body) as Map<String, dynamic>;
    // print(extractedData);
    return result.body;
    // extractedData.forEach((profileId, profileData) {
    //   loadedProfile.add(
    //     Profile(
    //       email: profileData['email'],
    //       lastName: profileData['firstName'],
    //       firstName: profileData['lastName'],
    //     ),
    //   );
    // });
    if (result.statusCode == 200) {
      print("hurray!User details added successfully!!");
    } else {
      print("nope,error in adding user to database");
    }
  }

  Future<dynamic> getUserRatingData(String userName) async {
    var result = await http
        .get("https://codeforces.com/api/user.rating?handle=$userName");
    if (result.statusCode == 200) {
      // print(result.toString());
      return result.body;
    } else {
      return "Error()";
    }
  }

  Future<dynamic> getUserSubmissionData(String userName) async {
    var result = await http
        .get("https://codeforces.com/api/user.status?handle=$userName");
    if (result.statusCode == 200) {
      print(result.toString());
      return result.body;
    }
  }

  //////////////////
  static Future<dynamic> getUserRankData(String userName, var rankinf) async {
    var result = await http
        .get("https://codeforces.com/api/user.rating?handle=$userName");
    if (result.statusCode == 200) {
      //  List<Map<String, dynamic>> da = [];
      Map<String, dynamic> newMap = (json.decode(result.body));
      // da.add(dd);
      //  rankinfo.add({'handle':dd[0]['handle']});
      // rankinfo.clear();
      //check it brooooooooooooooooo
      //   List <String> dt=[];
      // print(rankinfo);
      //print("11111111111111111111111111111111111111111111111");

      //  Map<String, dynamic> newMap = groupBy(da, (obj) => obj['contestId']);
      // Map<String, dynamic> newMap = dd;
      for (var v in newMap.values) {
        //  print(v);

        //    print('hiiiyyyyyyyyyyyyyyyyyyyyyyyy');
        if (v is List) {
          int k = 0;
          for (var j in v) {
            if (++k > v.length - 10) {
              //#########################
              rankinfo.add({
                'handle': j['handle'],
                'contestId': j['contestId'],
                'rank': j['rank'],
              });
              // j.forEach((i, value) {
              //   print('index=$i, value=$value');
              // });
              //   print("heeloooo12e25445");
            }
          }
        }
      }
      //  print(rankinfo);
      //print("11111111111111111111111111111111111111111111111");
      //#############3tryy...
      //  newMappk = groupBy(rankinfo, (obj) => obj['handle']);
      // .map((k, v) => MapEntry(
      //     k,
      //     v.map((item) {
      //       item.remove('handle');
      //       return item;
      //     }).toList()));
      // print(newMapp);
      //  print("MWNEE1222222222121");
      // for (var j in rankinfo) {
      //   j.forEach((key, value) {
      //     print('key==$key, and value==$value');
      //   });
      //   print("BIGSHOW");
      // }
      // for(var i in dd)

      //    rankinfo.add({"handle":dd[0]["handle"],"contestID":});

      // print(result.toString());
      return result.body;
    } else {
      return "Error()";
    }
  }

  static Future<dynamic> getPreContestData() async {
    contst.clear();
    var res =
        await http.get("https://codeforces.com/api/contest.list?gym=false");
    if (res.statusCode == 200) {
      Map nw = json.decode(res.body);

      nw.forEach((key, value) {
        //   print("hllllooo" + value.toString());
        if (value is List)
          value.forEach((ele) {
            if (ele['type'] == 'CF' &&
                ele['phase'] == 'FINISHED' &&
                contst.length != 11) contst.add(ele['id'].toString());
            //  //for size....here now 10!!
          });
      });
      // print(res.body);
      // for (var ij in contst) {
      //   print("1___ " + ij);
      // }
      return contst;
      // return res.body;
    } else {
      return "Error occured !!";
    }
  }
}
