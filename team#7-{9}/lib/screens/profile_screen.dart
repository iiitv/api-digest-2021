import 'dart:convert';

import 'package:cf_pursuit/screens/rating_chart.dart';
import 'package:cf_pursuit/screens/submission_chart.dart';
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
  ScrollController _scrollController = ScrollController();
  String dropDownValue = '';
  String userName = '';
  @override
  void initState() {
    dropDownValue = DateTime.now().year.toString();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final Map<String, Object> data =
        ModalRoute.of(context).settings.arguments as Map<String, Object>;
    userName = data["name"].toString() ?? userName;

    Future<dynamic> userData;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          userName,
        ),
        // automaticallyImplyLeading: false,
      ),
      drawer: appDrawer(context),
      body: FutureBuilder(
        future: UserData().getUserData(userName),
        builder: (context, userData) {
          if (userData.hasData) {
            Map<String, dynamic> userMapData =
                json.decode(userData.data.toString()) as Map<String, dynamic>;
            print(userMapData);
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
                                    "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
                                  ),
                          ),
                        ),
                        Container(
                          padding: EdgeInsets.only(left: 16),
                          // width:
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                (userMapData["result"][0]["firstName"]==null)?data["name"].toString() ?? userName:
                                  userMapData["result"][0]["firstName"]+  " " +
                                    userMapData["result"][0]["lastName"],
                                style: GoogleFonts.openSans(
                                    color: Colors.teal, fontSize: 23),
                              ),
                              if(userMapData["result"][0]["city"]!=null)
                              Text(
                                userMapData["result"][0]["city"],
                                style: GoogleFonts.openSans(
                                    color: Colors.teal, fontSize: 23),
                              ),
                              if( userMapData["result"][0]["country"]!=null)
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
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.all(Radius.circular(30))),
                      height: 260,
                      width: double.maxFinite,
                      margin: EdgeInsets.symmetric(horizontal: 10),
                      child: Card(
                        elevation: 15,
                        child: Container(
                          decoration: BoxDecoration(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(30))),
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
                                Card(
                                  elevation: 8,
                                  child: Column(
                                    children: [
                                      Container(
                                        padding:
                                            EdgeInsets.symmetric(horizontal: 8),
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
                                                text: userMapData["result"][0]
                                                        ["rating"]
                                                    .toString(),
                                                style: GoogleFonts.overpass(
                                                    fontSize: 18,
                                                    color: Colors.red),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                      Container(
                                        padding:
                                            EdgeInsets.symmetric(horizontal: 8),
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
                                                text: userMapData["result"][0]
                                                        ["rank"]
                                                    .toString(),
                                                style: GoogleFonts.overpass(
                                                    fontSize: 18,
                                                    color: Colors.red),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Divider(),
                                Card(
                                  elevation: 8,
                                  child: Column(
                                    children: [
                                      Container(
                                        padding:
                                            EdgeInsets.symmetric(horizontal: 8),
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
                                                text: userMapData["result"][0]
                                                        ["maxRating"]
                                                    .toString(),
                                                style: GoogleFonts.overpass(
                                                    fontSize: 18,
                                                    color: Colors.red),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                      Container(
                                        padding:
                                            EdgeInsets.symmetric(horizontal: 8),
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
                                                text: userMapData["result"][0]
                                                        ["maxRank"]
                                                    .toString(),
                                                style: GoogleFonts.overpass(
                                                    fontSize: 18,
                                                    color: Colors.red),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ]),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 40,
                    ),
                    Container(
                      child: RanksChart(userName),
                    ),
                    SizedBox(
                      height: 40,
                    ),
                    SubmissionChart(userName),
                  ],
                ),
              ),
            );
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
