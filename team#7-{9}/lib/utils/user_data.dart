import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class UserData {
  Map<String, dynamic> r = {};
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
    if (result.statusCode == 200) {
      print(result.toString());
      return result.body;
    } else {
      return "Error()";
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
    var result = await http.get(
        "https://codeforces.com/api/user.status?handle=$userName");
    if (result.statusCode == 200) {
      print(result.toString());
      return result.body;
    }
  }
}
