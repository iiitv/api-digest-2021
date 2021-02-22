import 'package:cf_pursuit/screens/future_events.dart';
import 'package:cf_pursuit/screens/landing_screen.dart';
import 'package:cf_pursuit/screens/profile_screen.dart';
import 'package:cf_pursuit/screens/rank_screen.dart';
import 'package:cf_pursuit/screens/problem.dart';
import 'package:cf_pursuit/screens/org_rank_screen.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  Firebase.initializeApp();
  runApp(
    MyApp(),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CF Pursuit',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.teal, disabledColor: Colors.white),
    //  home:FutureEventsScreen(),//Test(),// LandingScreenMobile(),
      home:LandingScreenMobile(),
      routes: {
        LandingScreenMobile.routeName: (context) => LandingScreenMobile(),
        ProfileScreen.routeName: (context) => ProfileScreen(),
        RankScreen.routeName: (context) => RankScreen(),
        Problem.routeName:(context)=>Problem(),
 FutureEventsScreen.routeName:(context)=>FutureEventsScreen(),
      },
    );
  }
}
