import 'dart:convert';

import 'package:cf_pursuit/screens/rank_chart.dart';
import 'package:cf_pursuit/utils/user_data.dart';
import 'package:cf_pursuit/widgets/drawer.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfileScreen extends StatefulWidget {
  static const routeName = '/profileScreen';
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  UserData user = UserData();
  Future<dynamic> userData;
  ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    // userData = user.getUserData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Map<String, Object> data = ModalRoute.of(context).settings.arguments;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          data["name"],
        ),
        // automaticallyImplyLeading: false,
      ),
      drawer: appDrawer(),
      body: FutureBuilder(
        future: UserData().getUserData(data["name"]??""),
        builder: (context, userData) {
          print("hi");
          print(userData.data);
          Map<String, dynamic> userMapData =
              json.decode(userData.data) as Map<String, dynamic>;
          print("Mm");
          print(userMapData.toString());
          print(userMapData["result"][0]["titlePhoto"].toString());
          if (userData.hasData)
            return SingleChildScrollView(
              controller: _scrollController,
              child: Container(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Container(
                          padding:
                              EdgeInsets.symmetric(vertical: 15, horizontal: 8),
                          child: CircleAvatar(
                            radius: 60,
                            backgroundImage: userMapData["result"][0]
                                            ["titlePhoto"]
                                        .toString() !=
                                    "null"
                                ? NetworkImage(
                                    "https:" +
                                        userMapData["result"][0]["titlePhoto"]
                                            .toString(),
                                  )
                                : NetworkImage(
                                    "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"),
                          ),
                        ),
                        Container(
                          padding: EdgeInsets.only(left: 16),
                          // width:
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                userMapData["result"][0]["firstName"] +
                                    " " +
                                    userMapData["result"][0]["lastName"],
                                style: GoogleFonts.openSans(
                                    color: Colors.teal, fontSize: 25),
                              ),
                              Text(
                                userMapData["result"][0]["city"],
                                style: GoogleFonts.openSans(
                                    color: Colors.teal, fontSize: 23),
                              ),
                              Text(
                                userMapData["result"][0]["country"],
                                style: GoogleFonts.openSans(
                                    color: Colors.teal, fontSize: 23),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Container(
                      decoration:
                          BoxDecoration(border: Border.all(color: Colors.grey)),
                      height: 220,
                      width: double.maxFinite,
                      margin: EdgeInsets.symmetric(horizontal: 10),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Container(
                              
                              width: double.maxFinite,
                              height: 30,
                              child: Center(
                                child: Text(
                                  "Codeforces Handle Details",
                                  style: GoogleFonts.roboto(
                                    fontSize: 20,
                                    color: Colors.black,
                                  ),
                                  textAlign: TextAlign.start,
                                ),
                              ),
                              color: Colors.grey[100],
                            ),
                            Container(
                              padding: EdgeInsets.symmetric(horizontal: 8),
                              height: 40,
                              width: 400,
                              child: RichText(
                                text: TextSpan(
                                  text: "Current Rating: ",
                                  style: GoogleFonts.overpass(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                      color: Colors.blue),
                                  children: [
                                    TextSpan(
                                      text: userMapData["result"][0]["rating"]
                                          .toString(),
                                      style: GoogleFonts.overpass(
                                          fontSize: 18, color: Colors.red),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                             Container(
                               padding: EdgeInsets.symmetric(horizontal: 8),
                              height: 40,
                              width: 400,
                              child: RichText(
                                text: TextSpan(
                                  text: "Current Rank: ",
                                  style: GoogleFonts.overpass(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                      color: Colors.blue),
                                  children: [
                                    TextSpan(
                                      text: userMapData["result"][0]["rank"]
                                          .toString(),
                                      style: GoogleFonts.overpass(
                                          fontSize: 18, color: Colors.red),
                                    ),
                                  ],
                                ),
                              ),),
                              Divider(),
                             Container(
                               padding: EdgeInsets.symmetric(horizontal: 8),
                              height: 40,
                              width: 400,
                              child: RichText(
                                text: TextSpan(
                                  text: "Maximum Rating: ",
                                  style: GoogleFonts.overpass(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                      color: Colors.blue),
                                  children: [
                                    TextSpan(
                                      text: userMapData["result"][0]["maxRating"]
                                          .toString(),
                                      style: GoogleFonts.overpass(
                                          fontSize: 18, color: Colors.red),
                                    ),
                                  ],
                                ),
                              ),),
                               Container(
                                 padding: EdgeInsets.symmetric(horizontal: 8),
                              height: 40,
                              width: 400,
                              child: RichText(
                                text: TextSpan(
                                  text: "Maximum Rank: ",
                                  style: GoogleFonts.overpass(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                      color: Colors.blue),
                                  children: [
                                    TextSpan(
                                      text: userMapData["result"][0]["maxRank"]
                                          .toString(),
                                      style: GoogleFonts.overpass(
                                          fontSize: 18, color: Colors.red),
                                    ),
                                  ],
                                ),
                              ),),
                          ]),
                    ),
                    SizedBox(height: 40,),
                    Container(child: RanksChart(data["name"]),),
                    Container(
                      child: Text(
                        userData.toString(),
                      ),
                    ),
                  ],
                ),
              ),
            );
          return CircularProgressIndicator();
        },
      ),
    );
  }
}
