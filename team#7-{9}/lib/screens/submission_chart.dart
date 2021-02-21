import 'dart:convert';
import 'dart:math';

import 'package:cf_pursuit/globals.dart';
import 'package:cf_pursuit/utils/user_data.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class SubmissionChart extends StatefulWidget {
  final String userName;
  SubmissionChart(this.userName);
  @override
  _SubmissionChartState createState() => _SubmissionChartState();
}

class _SubmissionChartState extends State<SubmissionChart> {
  int touchedIndex;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: UserData().getUserSubmissionData(widget.userName.toString()),
        builder: (context, subData) {
          if (subData.hasData) {
            Map<String, dynamic> resultData =
                json.decode(subData.data.toString()) as Map<String, dynamic>;
            print(resultData);
            final Map<String, double> submissionData = {};
            final Map<String, double> verdictData = {};
            int totalTags = 0, totalVerdicts = 0;
            print("---->>>>>>>>>>>>>>>");
            print(resultData.toString());
            List<dynamic> r = resultData["result"];

            r.forEach((element) {
              // print(element["problem"]["tags"]);
              List<dynamic> l = element["problem"]['tags'];
              l.forEach((element2) {
                if (submissionData.containsKey(element2)) {
                  submissionData[element2]++;
                } else {
                  submissionData[element2] = 0;
                }
                totalTags++;
              });
              if (verdictData.containsKey(element["verdict"])) {
                verdictData[element["verdict"]]++;
              } else {
                verdictData[element["verdict"]] = 0;
              }
              totalVerdicts++;
            });
            // print(submissionData);
            // print(verdictData);
            // print(totalVerdicts.toStringAsPrecision(3) +
            //     " " +
            //     totalTags.toStringAsPrecision(3));
            submissionData.forEach((key, value) {
              submissionData[key] = (value / totalTags) * 100;
            });
            verdictData.forEach((key, value) {
              verdictData[key] = (value / totalVerdicts) * 100;
            });

            print(submissionData);
            print(verdictData);

            return AspectRatio(
              aspectRatio: 1.5,
              child: Card(
                elevation: 10,
                color: Colors.white,
                child: Column(
                  children: [
                    Text(
                      "Submissions Chart:",
                      style: TextStyle(fontSize: 25),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Row(
                      children: <Widget>[
                        const SizedBox(
                          height: 18,
                        ),
                        Flexible(
                          child: AspectRatio(
                            aspectRatio: 1,
                            child: PieChart(
                              PieChartData(
                                  pieTouchData: PieTouchData(
                                      touchCallback: (pieTouchResponse) {
                                    setState(() {
                                      if (pieTouchResponse.touchInput
                                              is FlLongPressEnd ||
                                          pieTouchResponse.touchInput
                                              is FlPanEnd) {
                                        touchedIndex = -1;
                                      } else {
                                        touchedIndex = pieTouchResponse
                                            .touchedSectionIndex;
                                      }
                                    });
                                  }),
                                  borderData: FlBorderData(
                                    show: false,
                                  ),
                                  sectionsSpace: 0,
                                  centerSpaceRadius: 40,
                                  sections: showingSections(verdictData)),
                            ),
                          ),
                        ),
                        Column(
                          // mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.green[800],
                                  ),
                                  Text("Correct Answer"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.red,
                                  ),
                                  Text("Wrong Answer"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.amber,
                                  ),
                                  Text("TLE"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.grey,
                                  ),
                                  Text("Compilation Error"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.lightGreenAccent,
                                  ),
                                  Text("Challenged"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.red[900],
                                  ),
                                  Text("Run Time Error"),
                                ],
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Icon(
                                    Icons.circle,
                                    color: Colors.blue[800],
                                  ),
                                  Text("Memory limit Exceed"),
                                ],
                              ),
                            ),
                            SizedBox(
                              height: 18,
                            ),
                          ],
                        ),
                        const SizedBox(
                          width: 28,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          }
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: LinearProgressIndicator(),
            ),
          );
        });
  }

  List<PieChartSectionData> showingSections(Map<String, double> list) {
    // return List.generate(list.length, (i) {
    // final isTouched = i == touchedIndex;
    final double fontSize = 16; // isTouched ? 25 : 16;
    final double radius = 60; // isTouched ? 60 : 50;
    List<PieChartSectionData> result = [];
    Color color;
    list.forEach((key, value) {
      if (key == "OK") {
        color = Colors.green[800];
      } else if (key == "WRONG_ANSWER") {
        color = Colors.red;
      } else if (key == "TIME_LIMIT_EXCEEDED") {
        color = Colors.amber;
      } else if (key == "COMPILATION_ERROR") {
        color = Colors.grey;
      } else if (key == "CHALLENGED") {
        color = Colors.lightGreenAccent;
      } else if (key == "RUNTIME_ERROR") {
        color = Colors.red[900];
      } else if (key == "MEMORY_LIMIT_EXCEEDED") {
        color = Colors.blue[800];
      }
      result.insert(
        result.length,
        PieChartSectionData(
          color: color,
          value: value,
          title: "",
          radius: radius,
          titleStyle: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            color: Colors.teal,
          ),
        ),
      );
    });
    return result;
  }
}
