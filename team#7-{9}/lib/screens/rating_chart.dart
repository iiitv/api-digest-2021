import 'dart:convert';

import 'package:cf_pursuit/globals.dart';
import 'package:cf_pursuit/utils/user_data.dart';
import 'package:cf_pursuit/widgets/rating_chart_widget.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class RanksChart extends StatefulWidget {
  final String userName;
  RanksChart(this.userName);
  @override
  _RanksChartState createState() => _RanksChartState();
}

bool showAvg = false;

class _RanksChartState extends State<RanksChart> {
  bool isShowingMainData = true;
  ScrollController _listViewController = ScrollController();
  String dropDownValue = "2020"; //DateTime.now().year.toString();
  @override
  void initState() {
    super.initState();
    isShowingMainData = true;
    // dropDownValue = DateTime.now().year.toString();
    // print(dropDownValue);
  }

  int minYear = 2100;
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: UserData().getUserRatingData(widget.userName),
      builder: (context, ratingData) {
        if (ratingData.hasData) {
          Map<String, dynamic> userRatingData =
              json.decode(ratingData.data.toString()) as Map<String, dynamic>;
          List<FlSpot> ratingSpotsList = [];
          userRatingData["result"].forEach((val) {
            var ratingUpdateTimeSeconds = val["ratingUpdateTimeSeconds"];
            var date = new DateTime.fromMillisecondsSinceEpoch(
                ratingUpdateTimeSeconds * 1000);
            if (minYear > date.year) minYear = date.year;
            double pointX = date.year.toDouble() * 10000 +
                date.month.toDouble() * 100 +
                date.day.toDouble();
            double pointY = val["newRating"] + .0;
            if (dropDownValue.compareTo(date.year.toString()) == 0) {
              ratingSpotsList.insert(
                  ratingSpotsList.length, FlSpot(pointX, pointY));
            }
          });
          List<String> yearsList = [];
          for (int i = DateTime.now().year; i > minYear - 1; i--) {
            yearsList.add(i.toString());
          }
          return Container(
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Select Year: ",
                      style: TextStyle(fontSize: 18),
                    ),
                    DropdownButton<String>(
                      value: dropDownValue, //..dropDownValue,
                      icon: Icon(Icons.arrow_downward),
                      iconSize: 22,
                      elevation: 16,
                      style: TextStyle(color: Colors.deepPurple, fontSize: 18),
                      underline: Container(
                        height: 2,
                        color: Colors.deepPurpleAccent,
                      ),
                      onChanged: (String newValue) {
                        setState(() {
                          dropDownValue = newValue;
                        });
                      },
                      items: 
                      yearsList.map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                    ),
                  ],
                ),
                Container(
                  // width: MediaQuery.of(context).size.width*300,
                  height: MediaQuery.of(context).size.height * 0.4,
                  child: ListView(
                      controller: _listViewController,
                      scrollDirection: Axis.horizontal,
                      children: [
                        Container(
                          width: MediaQuery.of(context).size.width,
                          decoration: const BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(18)),
                            gradient: LinearGradient(
                              colors: //colorList,
                                  [
                                Color(0xff2c274c),
                                Color(0xff46426c),
                              ],
                              begin: Alignment.bottomCenter,
                              end: Alignment.topCenter,
                            ),
                          ),
                          child: Stack(
                            children: <Widget>[
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: <Widget>[
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  Text(
                                    'Rating for $dropDownValue',
                                    style: TextStyle(
                                      color: Color(0xff827daa),
                                      fontSize: 16,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                  const SizedBox(
                                    height: 4,
                                  ),
                                  Expanded(
                                    child: Padding(
                                      padding: const EdgeInsets.only(
                                          right: 16.0, left: 6.0),
                                      child: !(minYear.toString().compareTo(
                                                  dropDownValue.toString()) >
                                              0)
                                          ? Builder(
                                              builder: (context) => LineChart(
                                                sampleData2(ratingSpotsList),
                                                swapAnimationDuration:
                                                    const Duration(
                                                        milliseconds: 350),
                                              ),
                                            )
                                          : Center(
                                              child: Text(
                                              "No data Available for this year!!",
                                              style: GoogleFonts.openSans(
                                                  fontSize: 20,
                                                  color: Colors.grey),
                                            )),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ]),
                ),
              ],
            ),
          );
        }
        return CircularProgressIndicator.adaptive();
      },
    );
  }
}