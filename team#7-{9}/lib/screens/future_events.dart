import 'dart:convert';

import 'package:cf_pursuit/utils/gcalendar.dart';
import 'package:cf_pursuit/utils/user_data.dart';
import 'package:cf_pursuit/widgets/drawer.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_countdown_timer/flutter_countdown_timer.dart';

class FutureEventsScreen extends StatefulWidget {
  static const routeName = '/futureEvents';
  @override
  _FutureEventsScreenState createState() => _FutureEventsScreenState();
}

class _FutureEventsScreenState extends State<FutureEventsScreen> {
  UserData userData = UserData();
  // var futureContests;
  bool isAdded = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Future Events"),
      ),
      drawer: appDrawer(context),
      body: FutureBuilder(
        future: UserData.futureContestData(),
        builder: (context, futureContestDataSnap) {
          if (futureContestDataSnap.hasData) {
            Map<String, dynamic> futureContests =
                json.decode(futureContestDataSnap.data.toString())
                    as Map<String, dynamic>;
            print(futureContests);
            List<dynamic> l = futureContests["result"];
            final List<dynamic> futureEventsNamesList = [];
            final List<dynamic> futureEventsTimesList = [];
            final List<int> timeLeft = [];
            final List<int> contestDuration = [];
            l.forEach((element) {
              if (element["phase"] == "BEFORE") {
                futureEventsNamesList.insert(
                    futureEventsNamesList.length, element["name"]);
                futureEventsTimesList.insert(
                    futureEventsTimesList.length, element["startTimeSeconds"]);
                timeLeft.insert(
                    timeLeft.length, element["relativeTimeSeconds"]);
                contestDuration.insert(
                    contestDuration.length, element["durationSeconds"]);
              }
            });
            print(futureEventsTimesList);
            print(futureEventsNamesList);
            print(timeLeft);
            print(contestDuration);
            return ListView.builder(
                itemCount: futureEventsNamesList.length,
                itemBuilder: (context, index) {
                  return Container(
                    height: MediaQuery.of(context).size.height * 0.21,
                    width: double.maxFinite,
                    padding: EdgeInsets.all(8),
                    child: Card(
                      elevation: 3,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          FittedBox(
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  vertical: 8, horizontal: 4),
                              // width: MediaQuery.of(context).size.width * 0.65,
                              child: Text(
                                futureEventsNamesList[index],
                                style: GoogleFonts.roboto(
                                  fontSize: 20,
                                ),
                              ),
                            ),
                          ),
                          Container(
                            padding: EdgeInsets.only(left: 20),
                            child: RichText(
                              text: TextSpan(
                                text: "Date: ",
                                style: GoogleFonts.overpass(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                    color: Colors.purple),
                                children: [
                                  TextSpan(
                                    text: DateTime.fromMillisecondsSinceEpoch(
                                            futureEventsTimesList[index] * 1000)
                                        .toLocal()
                                        .toString()
                                        .substring(0, 10),
                                    style: GoogleFonts.overpass(
                                        fontSize: 18, color: Colors.grey),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Expanded(
                            child: Container(
                                alignment: Alignment.bottomRight,
                                padding: EdgeInsets.only(
                                    left: 20, bottom: 2, right: 5),
                                child: CountdownTimer(
                                  endWidget: Center(
                                    child: Text("Contest Ended"),
                                  ),
                                  textStyle: GoogleFonts.openSans(
                                    fontSize: 18,
                                    color: Colors.blue,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  endTime:
                                      DateTime.now().millisecondsSinceEpoch +
                                          timeLeft[index] * (-1000),
                                )),
                          ),
                          Expanded(
                            child: Container(
                              alignment: Alignment.bottomRight,
                              padding: EdgeInsets.only(top: 2, bottom: 5),
                              height:
                                  MediaQuery.of(context).size.height * 0.027,
                              // width:MediaQuery.of(context).size.width*0.1,
                              child: ElevatedButton(
                                child: Text(
                                 isAdded?"Contest Added!": "Add this event to calendar",
                                ),
                                onPressed: () {
                                  GoogleCalendar googleCalendar =
                                      GoogleCalendar();
                                  bool resultBool = googleCalendar.initialize(
                                      futureEventsNamesList[index],
                                      DateTime.fromMillisecondsSinceEpoch(
                                          futureEventsTimesList[index] * 1000),
                                      contestDuration[index].toInt());
                                  setState(() {
                                    isAdded = resultBool;
                                  });
                                },
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                });
          }
          return Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    );
  }
}
