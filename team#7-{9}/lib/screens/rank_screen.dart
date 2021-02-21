import 'package:cf_pursuit/screens/profile_screen.dart';
import 'package:cf_pursuit/widgets/drawer.dart';
import 'package:flutter/material.dart';
import "package:collection/collection.dart";
import 'package:google_fonts/google_fonts.dart';
import 'package:json_table/json_table.dart';
import 'dart:convert';
import 'package:horizontal_data_table/horizontal_data_table.dart';

import 'package:cf_pursuit/utils/user_data.dart';

class RankScreen extends StatefulWidget {
  static const routeName = '/rankScreen';
  //var rankinfo = [];

  static const int sortStatus = 1;

  @override
  _RankScreenState createState() => _RankScreenState();
}

class _RankScreenState extends State<RankScreen> {
  var userDBData = {};
  @override
  void initState() {
    // userDBData = UserData().getDBUserData();
    super.initState();
  }

  Map newMapp = {};

  List rankingss = [];

  HDTRefreshController _hdtRefreshController = HDTRefreshController();

  bool isAscending = true;
  final ScrollController listScoller = ScrollController();

  final ScrollController gridScoller = ScrollController();

  Future<dynamic> getRanks(List<String> userName) async {
    UserData.rankinfo.clear();

    // var contestData = await UserData.getPreContestData();
    // print(contestData.data);
    // //  if (contestDat.) {
    //           print(contestData.data);
    //           contests = contestData.data;
    // var userssData = UserData().getDBUserData();
    // print("--------------------------->>>>>>>>>>>>"+userssData.toString());
    for (var i in userName) {
      print(i.toString());

      if (i == userName[userName.length - 1])
        return await UserData.getUserRankData(i, []);
      else
        await UserData.getUserRankData(i, []);
    }
  }

  // var data = [
  //   {
  //     'handle': 'valiant_vidit',
  //     'contestId': [
  //       '1360',
  //       '1361',
  //       '1362',
  //     ],
  //   },
  //   {
  //     'handle': 'vikrant3302',
  //     'contestId': ['1361', '1362', '1363'],
  //   }
  // ];
  var newMapps;
  List<dynamic> users = [];
  List<dynamic> userFromDb = [];
  List<dynamic> contests = [];
  @override
  Widget build(BuildContext context) {
    print("######");
    // var pk = groupBy(data, (obj) => obj['contestId']).map((k, v) => MapEntry(
    //     k,
    //     v.map((item) {
    //       item.remove('contestId');
    //       return item;
    //     }).toList()));
    // print("hellllllllllllooooooooo maoooonikkkkkkkkk");
    // print(pk);
    // rankinfo.clear();
    // print(UserData.rankinfo);
    return Scaffold(
        appBar: AppBar(
          title: Text('Rankings'),
        ),

        drawer: appDrawer(context),
        body: FutureBuilder(
            future: UserData().getDBUserData(),
            builder: (context, userDbDataShot) {
              if (userDbDataShot.hasData) {
                Map<String, dynamic> userDbData =
                    json.decode(userDbDataShot.data.toString())
                        as Map<String, dynamic>;
                print(userDbData);
                userFromDb = userDbData.keys.toList();
                print(userFromDb);
                return FutureBuilder(
                    future: UserData.getPreContestData(),
                    builder: (context, contestData) {
                      if (contestData.hasData) {
                        print(contestData.data);
                        contests = contestData.data;
                        return FutureBuilder(
                          future: getRanks(userFromDb),//['valiant_vidit', 'vikrant3302']
                          builder: (context, rankinf) {
                            if (rankinf.hasData) {
                              // print("a12222222222");
                              // print(rankinf.data);
                              var rr = UserData.rankinfo;
                              // print(rr);
                              newMapp = groupBy(rr, (obj) => obj['handle'])
                                  .map((k, v) => MapEntry(
                                      k,
                                      v.map((item) {
                                        item.remove('handle');
                                        return item;
                                      }).toList()));
                              //    rankinfo = UserData.rankinfo;
                              // print(newMapp["valiant_vidit"][0]["contestId"]);
                              // print("New Mapp-->");
                              // print(newMapp);

                              //#####>>>>>>>>>>>>>>>>>>>>>>>!!!!!!!!!!!! final map just above
                              /*
                    {
                      valiant_vidit: 
                     [
                     {contestId: 1473, rank: 9117}, {contestId: 1474, rank: 6339},                      
                     {contestId: 1478, rank: 9134}, {contestId: 1476, rank: 2521}, 
                     {contestId: 1481, rank: 2741}, {contestId: 1480, rank: 5225},
                     {contestId: 1485, rank: 1577}, {contestId: 1487, rank: 2851}, 
                     {contestId: 1490, rank: 1085}, {contestId: 1486, rank: 3771}
                     ]

                      valiant_vidit: 
                     [
                     {contestId: 1473, rank: 9117}, {contestId: 1474, rank: 6339},                      
                     {contestId: 1478, rank: 9134}, {contestId: 1476, rank: 2521}, 
                     {contestId: 1481, rank: 2741}, {contestId: 1480, rank: 5225},
                     {contestId: 1485, rank: 1577}, {contestId: 1487, rank: 2851}, 
                     {contestId: 1490, rank: 1085}, {contestId: 1486, rank: 3771}
                     ]
                     
                     }
                    */
                              ///...............................................\\\\
                              List rankingss = [];
                              //      List contst = ['1478', '1486'];
                              //this should be called.
                              for (var cnt in UserData.contst) {
                                //   print('id==>> '+cnt.toString());
                                newMapp.forEach((handle, value) {
                                  value.forEach((element) {
                                    // ignore: unrelated_type_equality_checks
                                    if (element['contestId'].toString() ==
                                        cnt) //here 1478 replaced by contestarray!!
                                      rankingss.add({
                                        'handle': handle,
                                        'contestId': cnt.toString(),
                                        'rank': element['rank'].toString()
                                      });
                                    //    print(handle.toString()+"ams "+element['contestId'].toString());
                                  });
                                });
                              }
                              //final printing of things.
                              // print("object " + rankingss.length.toString());

                              //here in rankings--> username, contestId, name
                              // for (var ele in rankingss) {
                              //   print(ele.toString());
                              // }
                              //just take care here that finally all things in a newmapk are there for multiple users.!!
////...................................\\\\\\
                              //222@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

                              newMapps = rankingss;
                              print("NewMapps---11---------->");
                              users = newMapp.keys.toList();
                              print(newMapps);
                              print(users);
                              /////@@@@@@@@@///@@@@@@@///@@@@@@@@
                              return Container(
                                child: HorizontalDataTable(
                                  leftHandSideColumnWidth: 150,
                                  rightHandSideColumnWidth: 1000,
                                  isFixedHeader: true,
                                  headerWidgets: _getTitleWidget(),
                                  leftSideItemBuilder: (context, index) =>
                                      FlatButton(
                                    color: index % 2 == 0
                                        ? Colors.grey[200]
                                        : Colors.white,
                                    onPressed: () => Navigator.pushNamed(
                                        context, ProfileScreen.routeName,
                                        arguments: {
                                          "name": users[index].toString(),
                                        }),
                                    child: Container(
                                      child: Text(
                                        users[index].toString() ?? "",
                                        style: TextStyle(fontSize: 16),
                                      ),
                                      width: 300,
                                      height: 52,
                                      padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                                      alignment: Alignment.centerLeft,
                                      color: index % 2 == 0
                                          ? Colors.grey[200]
                                          : Colors.white,
                                    ),
                                  ), //_generateFirstColumnRow,
                                  rightSideItemBuilder:
                                      _generateRightHandSideColumnRow,
                                  itemCount:
                                      users.length, // user.userInfo.length,
                                  rowSeparatorWidget: const Divider(
                                    color: Colors.black54,
                                    height: 1.0,
                                    thickness: 0.0,
                                  ),
                                  leftHandSideColBackgroundColor:
                                      Color(0xFFFFFFFF),
                                  rightHandSideColBackgroundColor:
                                      Color(0xFFFFFFFF),
                                  enablePullToRefresh: true,
                                  refreshIndicator: const WaterDropHeader(),
                                  refreshIndicatorHeight: 60,
                                  onRefresh: () async {
                                    //Do sth
                                    await Future.delayed(
                                        const Duration(milliseconds: 500));
                                    _hdtRefreshController.refreshCompleted();
                                  },
                                  htdRefreshController: _hdtRefreshController,
                                ),
                                height: MediaQuery.of(context).size.height,
                              );
                            }
                            return Center(child: CircularProgressIndicator());
                          },
                        );
                      }
                      return Center(
                        child: CircularProgressIndicator(),
                      );
                    });
              }
              return Center(
                child: CircularProgressIndicator(),
              );
            }));
    // }    );
  }

  List<Widget> _getTitleWidget() {
    return [
      // Text("Username"),
      _getTitleItemWidget('UserName', 100),
      for (int i = 0; i < 10; i++)
        sortButtonTitleWidget(contests.length != 0 ? contests[i] : "ContestId"),
    ];
  }

  Widget sortButtonTitleWidget(String title) {
    return _getTitleItemWidget(title, 100);
  }

  Widget _getTitleItemWidget(String label, double width) {
    return Container(
      child: Text(
        label,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
      width: width,
      height: 56,
      padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
      alignment: Alignment.centerLeft,
    );
  }

  String getRankContestData(int index, int rowIndex) {
    String result = "-";
    newMapp[users[index]].forEach((val) {
      // print(val["contestId"]);
      // print(val["rank"].toString());
      if (val["contestId"]
              .toString()
              .compareTo(contests[rowIndex].toString()) ==
          0) //contests[index])
        result = val["rank"].toString();
    });
    // print("iitut----------------------------->>$result");
    return result;
  }

  Widget _generateRightHandSideColumnRow(BuildContext context, int index) {
    return Row(
      children: <Widget>[
        for (int i = 0; i < 10; i++)
          Container(
            color: index % 2 == 0 ? Colors.grey[200] : Colors.white,
            child: Row(
              children: <Widget>[
                Text(newMapp.length != 0
                    ? getRankContestData(index, i) //[0]["rank"].toString()
                    : ""),
              ],
            ),
            width: 100,
            height: 52,
            padding: EdgeInsets.fromLTRB(5, 0, 0, 0),
            alignment: Alignment.centerLeft,
          ),
      ],
    );
  }
}
