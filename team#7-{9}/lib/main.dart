import 'package:cf_pursuit/screens/landing_screen.dart';
import 'package:cf_pursuit/screens/profile_screen.dart';
import 'package:cf_pursuit/screens/rank_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';


void main() {
  runApp( MyApp(),);
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CF Pursuit',
      theme: ThemeData(
        primarySwatch: Colors.teal,
        disabledColor: Colors.white
      ),
      home:LandingScreenMobile(),
      routes: {
        ProfileScreen.routeName:(context)=>ProfileScreen(),
        RankScreen.routeName:(context)=>RankScreen(),
      },
    );
  }
}
