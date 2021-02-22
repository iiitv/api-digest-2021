// import 'package:flutter/material.dart';
// import "package:collection/collection.dart";
// import 'dart:convert';
// import 'package:url_launcher/url_launcher.dart';

// import 'dart:math';
// import 'package:http/http.dart' as http;
// import 'package:horizontal_data_table/horizontal_data_table.dart';

// import 'package:cf_pursuit/utils/user_data.dart';

// class OrgRankScreen extends StatefulWidget {
//   static const routeName = '/OrgrankScreen';
//   ////////////////////

//   @override
//   _OrgRankScreenState createState() => _OrgRankScreenState();
// }

// class _OrgRankScreenState extends State<OrgRankScreen> {
//   List data = [];
//   List validOrg = [];
//   var verify_map = {};
//   List fin_map = [];
//   List Contestid = ['1485']; //dummy data
//   @override
//   HDTRefreshController _hdtRefreshController = HDTRefreshController();

//   bool isAscending = true;
//   final ScrollController listScoller = ScrollController();

//   final ScrollController gridScoller = ScrollController();

//   Future<dynamic> getRanks() async {
//     data.clear();
//     validOrg.clear();
//     verify_map.clear();
//     fin_map.clear();
//     // UserData.rankinfo.clear();

//     for (var cnt in Contestid) {
//       print('hi');
//       var result = await http.get(
//           'https://codeforces.com/api/contest.standings?contestId=$cnt&from=1&count=200'); //testing

//       if (result.statusCode == 200) {
//         //print('result');
//         var map = json.decode(result.body) as Map;
//         //print('map==>');
//         // print(map['result']['rows']);
//         map['result']['rows'].forEach((ele) {
//           data.add({
//             'handle': ele['party']['members'][0]['handle'],
//             'contestID': ele['party']['contestId'],
//             'rank': ele['rank'],
//           });

//           //  print(ele['party']['members'][0]['handle']);
//           // print(ele['party']['contestId']);
//           // print(ele['rank']);
//           // print('/////');
//         });
//       } else
//         return Error();
//     }
//     var new_map = groupBy(data, (obj) => obj['handle']).map((k, v) => MapEntry(
//         k,
//         v.map((item) {
//           item.remove('handle');
//           return item;
//         }).toList()));
//     print("///");
//     //  print(new_map);
// //new_map is important
//     String st1 = '';

//     for (var it in new_map.keys) {
//       if (!(it == null)) st1 = st1 + ';' + it.toString();
//     }
//     //  print(st1);

//     var result1 = await http.get(
//         'https://codeforces.com/api/user.info?handles=' + st1.substring(1));

//     if (result1.statusCode == 200) {
//       verify_map = json.decode(result1.body) as Map;

//       verify_map['result'].forEach((ele) {
//         if (ele['organization'] == null) //u can change the name
//           validOrg.add(ele['handle']);
//       });
//       print('hi........bro......oooooooo');
//       print(validOrg);

//       for (var name in validOrg) {
//         fin_map.add({
//           'handle': name,
//           'contestID': new_map[name][0]['contestID'],
//           'rank': new_map[name][0]['rank'],
//           // 'stuff': new_map[name],
//         });
//       }
//       //imp....
//       return result1.body;
//       //##############################
//     } else
//       return Error();
//     ////////////
//   }

//   Widget build(BuildContext context) {
//     return Container(
//         child: FutureBuilder(
//       future: getRanks(),
//       builder: (context, snap) {
//         if (snap.hasData) {
//           print(fin_map);
//           return Container(
//             child: HorizontalDataTable(
//               leftHandSideColumnWidth: 150,
//               rightHandSideColumnWidth: 1000,
//               isFixedHeader: true,
//               headerWidgets: _getTitleWidget(),
//               leftSideItemBuilder: (context, index) => FlatButton(
//                 color: index % 2 == 0 ? Colors.grey[200] : Colors.white,
//                 onPressed: () => Navigator.pushNamed(
//                     context, ProfileScreen.routeName,
//                     arguments: {
//                       "name": users[index].toString(),
//                     }),
//                 child: Container(
//                   child: Text(
//                     users[index].toString() ?? "",
//                     style: TextStyle(fontSize: 16),
//                   ),
//                   width: 300,
//                   height: 52,
//                   padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
//                   alignment: Alignment.centerLeft,
//                   color: index % 2 == 0 ? Colors.grey[200] : Colors.white,
//                 ),
//               ), //_generateFirstColumnRow,
//               rightSideItemBuilder: _generateRightHandSideColumnRow,
//               itemCount: users.length, // user.userInfo.length,
//               rowSeparatorWidget: const Divider(
//                 color: Colors.black54,
//                 height: 1.0,
//                 thickness: 0.0,
//               ),
//               leftHandSideColBackgroundColor: Color(0xFFFFFFFF),
//               rightHandSideColBackgroundColor: Color(0xFFFFFFFF),
//               enablePullToRefresh: true,
//               refreshIndicator: const WaterDropHeader(),
//               refreshIndicatorHeight: 60,
//               onRefresh: () async {
//                 //Do sth
//                 await Future.delayed(const Duration(milliseconds: 500));
//                 _hdtRefreshController.refreshCompleted();
//               },
//               htdRefreshController: _hdtRefreshController,
//             ),
//             height: MediaQuery.of(context).size.height,
//           );
//         }
//         return Center(child: CircularProgressIndicator());
//       },
//     ));
//   }

//   List<Widget> _getTitleWidget() {
//     return [
//       // Text("Username"),
//       _getTitleItemWidget('UserName', 100),
//       for (int i = 0; i < 10; i++)
//         sortButtonTitleWidget(contests.length != 0 ? contests[i] : "ContestId"),
//     ];
//   }

//   Widget sortButtonTitleWidget(String title) {
//     return _getTitleItemWidget(title, 100);
//   }

//   Widget _getTitleItemWidget(String label, double width) {
//     return Container(
//       child: Text(
//         label,
//         style: TextStyle(
//           fontWeight: FontWeight.bold,
//           fontSize: 16,
//         ),
//       ),
//       width: width,
//       height: 56,
//       padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
//       alignment: Alignment.centerLeft,
//     );
//   }

//   String getRankContestData(int index, int rowIndex) {
//     String result = "-";
//     newMapp[users[index]].forEach((val) {
//       // print(val["contestId"]);
//       // print(val["rank"].toString());
//       if (val["contestId"]
//               .toString()
//               .compareTo(contests[rowIndex].toString()) ==
//           0) //contests[index])
//         result = val["rank"].toString();
//     });
//     // print("iitut----------------------------->>$result");
//     return result;
//   }

//   Widget _generateRightHandSideColumnRow(BuildContext context, int index) {
//     return Row(
//       children: <Widget>[
//         for (int i = 0; i < 10; i++)
//           Container(
//             color: index % 2 == 0 ? Colors.grey[200] : Colors.white,
//             child: Row(
//               children: <Widget>[
//                 Text(newMapp.length != 0
//                     ? getRankContestData(index, i) //[0]["rank"].toString()
//                     : ""),
//               ],
//             ),
//             width: 100,
//             height: 52,
//             padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
//             alignment: Alignment.centerLeft,
//           ),
//       ],
//     );
//   }
// }
