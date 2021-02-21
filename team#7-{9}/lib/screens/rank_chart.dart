import 'dart:convert';

import 'package:cf_pursuit/utils/user_data.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class RanksChart extends StatefulWidget {
  final String userName;
  RanksChart(this.userName);
  @override
  _RanksChartState createState() => _RanksChartState();
}

List<Color> gradientColors = [
  const Color(0xff23b6e6),
  const Color(0xff02d39a),
];

bool showAvg = false;

class _RanksChartState extends State<RanksChart> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 200,
      color: Colors.purple[900],
      child: FutureBuilder(
        future: UserData().getUserRankData(widget.userName??""),
        builder: (context, rankData) {
          List<int> ratings = [];
          Map<String, dynamic> userRankData =
              json.decode(rankData.data) as Map<String, dynamic>;
          print(userRankData);
          userRankData["result"].forEach(
              (val) => ratings.insert(ratings.length, val["contestId"]));
          // print(ranks.toString());
          if (rankData.hasData)
            return LineChart(LineChartData(
              gridData: FlGridData(
                show: true,
                drawVerticalLine: false,
                getDrawingHorizontalLine: (value) {
                  return FlLine(
                    color: const Color(0xff37434d),
                    strokeWidth: 1,
                  );
                },
                getDrawingVerticalLine: (value) {
                  return FlLine(
                    color: const Color(0xff37434d),
                    strokeWidth: 1,
                  );
                },
              ),
              titlesData: FlTitlesData(
                show: true,
                bottomTitles: SideTitles(
                  showTitles: false,
                  reservedSize: 22,
                  getTextStyles: (value) => const TextStyle(
                      color: Color(0xff68737d),
                      fontWeight: FontWeight.bold,
                      fontSize: 16),
                  getTitles: (value) {
                    switch (value.toInt()) {
                      case 2:
                        return 'MAR';
                      case 5:
                        return 'JUN';
                      case 8:
                        return 'SEP';
                    }
                    return '';
                  },
                  margin: 8,
                ),
                leftTitles: SideTitles(
                  showTitles: false,
                  getTextStyles: (value) => const TextStyle(
                    color: Color(0xff67727d),
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                  getTitles: (value) {
                    switch (value.toInt()) {
                      case 1:
                        return '10k';
                      case 3:
                        return '30k';
                      case 5:
                        return '50k';
                    }
                    return '';
                  },
                  reservedSize: 28,
                  margin: 12,
                ),
              ),
              borderData: FlBorderData(
                  show: true,
                  border: Border.all(color: const Color(0xff37434d), width: 1,),),
              minX: 0,
              maxX: 11,
              minY: 0,
              maxY: 6,
              lineBarsData: [
                LineChartBarData(
                  spots: [
                    FlSpot(0, 3),
                    FlSpot(2.6, 2),
                    FlSpot(4.9, 5),
                    FlSpot(6.8, 3.1),
                    FlSpot(8, 4),
                    FlSpot(9.5, 3),
                    FlSpot(11, 4),
                  ],
                  isCurved: true,
                  colors: gradientColors,
                  barWidth: 5,
                  isStrokeCapRound: true,
                  dotData: FlDotData(
                    show: false,
                  ),
                  belowBarData: BarAreaData(
                    show: true,
                    colors: gradientColors
                        .map((color) => color.withOpacity(0.3))
                        .toList(),
                  ),
                ),
              ],
            ));
          return CircularProgressIndicator.adaptive();
        },
      ),
    );
  }
}
