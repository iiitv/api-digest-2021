import 'dart:math';

import "package:flutter/material.dart";
import 'package:fl_chart/fl_chart.dart';

LineChartData sampleData2(List<FlSpot> list) {
  List<double> sortedListX = [];
  List<double> sortedListY = [];
  Set<String> bottomTileData = {};
  list.forEach((element) {
    sortedListX.insert(sortedListX.length, element.x);
    sortedListY.insert(sortedListY.length, element.y);
  });
  sortedListX.sort();
  sortedListY.sort();
  // sortedListX.forEach((val) => print(">>" + val.toString()));
  // print("ooo");
  // sortedListY.forEach((val) => print(">>" + val.toString()));
  // final double maxx = sortedListX[sortedListX.length - 1].toDouble();
  final double miny = sortedListY[0].toDouble();
  final double maxy = sortedListY[sortedListY.length - 1].toDouble();
  // final double minx = sortedListX[0].toDouble();
  final int maxxx =
      (sortedListX[sortedListX.length - 1].toInt() ~/ 10000).toInt() + 1231;
  return LineChartData(
    lineTouchData: LineTouchData(
      touchTooltipData: LineTouchTooltipData(
        tooltipBgColor: Colors.blueGrey.withOpacity(0.8),
      ),
      touchCallback: (LineTouchResponse touchResponse) {},
      handleBuiltInTouches: false,
    ),

    gridData: FlGridData(
      show: true,
    ),

    minY: miny <= 800
        ? 0
        : miny < 1500
            ? 800
            : miny < 3000
                ? 1500
                : miny < 4500
                    ? 3000
                    : 4500,
    maxY: maxy + 200, // sortedListY[sortedListX.length - 1].toDouble()+200,

    titlesData: FlTitlesData(
      bottomTitles: SideTitles(
        showTitles: true,
        reservedSize: 35,
        rotateAngle: 40,
        getTextStyles: (value) => const TextStyle(
          color: Color(0xff72719b),
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
        margin: 10,
        getTitles: (value) {
          if (value.toString().substring(4, 6).compareTo("12") <= 0 &&
              value.toString().substring(4, 6).compareTo("00") != 0 &&
              value.toString().substring(6).compareTo("31") <= 0 &&
              value.toString().substring(6).compareTo("00") != 0) {
            // print(value);

            if (bottomTileData.contains(value.toString().substring(4, 6) +
                "/" +
                value.toString().substring(0, 4))) return '';
            bottomTileData.add(value.toString().substring(4, 6) +
                "/" +
                value.toString().substring(0, 4));
            // const String res=value.toString().substring(0,6);
            return value.toString().substring(4, 6) +
                "/" +
                value.toString().substring(2, 4);
          }
          return "";
        },
      ),
      leftTitles: SideTitles(
        showTitles: true,
        getTextStyles: (value) => const TextStyle(
          color: Color(0xff75729e),
          fontWeight: FontWeight.bold,
          fontSize: 12,
        ),
        getTitles: (value) {
          switch (value.toInt()) {
            case 500:
              return '500';
            case 1000:
              return '1000';
            case 1250:
              return '1250';
            case 1500:
              return '1500';
            case 2000:
              return '2000';
            case 2500:
              return '2500';
            case 3000:
              return '3000';
            case 4000:
              return '4000';
            case 4500:
              return '4500';
          }
          return '';
        },
        margin: 8,
        reservedSize: 30,
      ),
    ),
    borderData: FlBorderData(
      show: false,
      border: const Border(
        bottom: BorderSide(
          color: Color(0xff4e4965),
          width: 1,
        ),
        left: BorderSide(
          color: Colors.transparent,
        ),
        right: BorderSide(
          color: Colors.transparent,
        ),
        top: BorderSide(
          color: Colors.transparent,
        ),
      ),
    ),
    // minX:202101,// lastContest.toDouble()-5.0,
    // maxX: lastContest.toDouble(),

    lineBarsData: linesBarData2(list),
  );
}

List<LineChartBarData> linesBarData2(List<FlSpot> list) {
  return [
    LineChartBarData(
      spots: list,

      isCurved: true,
      curveSmoothness: 0,
      colors: const [
        Colors.amberAccent, //  Color(0x4427b6fc),
      ],
      barWidth: 2,
      // show: false,
      isStrokeCapRound: false, //true,
      dotData: FlDotData(show: false),
      belowBarData: BarAreaData(
        show: false,
      ),
    ),
  ];
}
