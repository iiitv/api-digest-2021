import 'package:cf_pursuit/screens/landing_screen.dart';
import 'package:cf_pursuit/screens/problem.dart';
import 'package:cf_pursuit/screens/profile_screen.dart';
import 'package:cf_pursuit/screens/rank_screen.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget appDrawer(BuildContext context) {
  return Drawer(
    child: Column(
      children: [
        Container(
          height: 150,
          width: double.maxFinite,
          padding: EdgeInsets.symmetric(vertical: 8, horizontal: 8),
          margin: EdgeInsets.only(bottom: 10),
          child: Align(
            alignment: Alignment.bottomLeft,
            child: Text(
              "CF-Pursuit",
              style: GoogleFonts.openSans(fontSize: 30, color: Colors.white),
            ),
          ),
          decoration: BoxDecoration(
            color: Colors.teal,
          ),
        ),
        FlatButton(
          onPressed: () {
            Navigator.of(context).pop();
            Navigator.of(context).pushNamed(LandingScreenMobile.routeName);
            // Navigator.of(context).pushNamed(ProfileScreen.routeName);
          },
          child: Text(
            "View Profile",
            style: GoogleFonts.roboto(fontSize: 20),
          ),
        ),
        Divider(),
         FlatButton(
          onPressed: () {
             Navigator.of(context).pop();
            Navigator.of(context).pushNamed(Problem.routeName);
          },
          child: Text(
            "Problem Recommender",
            style: GoogleFonts.roboto(fontSize: 20),
          ),
        ),
        Divider(),
        FlatButton(
          onPressed: () {
             Navigator.of(context).pop();
            Navigator.of(context).pushNamed(RankScreen.routeName);
          },
          child: Text(
            "Ranklist",
            style: GoogleFonts.roboto(fontSize: 20),
          ),
        ),
        Divider(),
        Expanded(child:  Align(
          alignment: Alignment.bottomCenter,
          child: Card(
            elevation: 15,
            child: FlatButton(
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed(LandingScreenMobile.routeName);
              },
              child: Text(
                "Go to starting Page->",
                style: GoogleFonts.roboto(fontSize: 20),
              ),
            ),
          ),
        ),)
      ],
    ),
  );
}
