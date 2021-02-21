import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animated_text_kit/animated_text_kit.dart';

class LandingScreenMobile extends StatefulWidget {
  @override
  _LandingScreenMobileState createState() => _LandingScreenMobileState();
}

List<Color> colorList = [
  Color(0xff009797),
  Colors.teal,
  Color(0xff4cb6b6),
  Color(0xff99d5d5)
];

class _LandingScreenMobileState extends State<LandingScreenMobile> {
  FocusNode nameFieldNode = FocusNode();
  FocusNode instituteFieldNode = FocusNode();
   FocusNode nameSubmitNode = FocusNode();
    FocusNode instituteSubmitNode = FocusNode();
  ScrollController scrollController = ScrollController();
  @override
  Widget build(BuildContext context) {
    double deviceHeight = MediaQuery.of(context).size.height,
        deviceWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color.fromRGBO(34, 38, 76, 1),
      body: SingleChildScrollView(
        controller: scrollController,
        child: Container(
          height: deviceHeight * 0.98,
          child: Column(
            children: [
              WavyHeader(),
              FittedBox(
                child: Container(
                  padding: EdgeInsets.all(8),
                  child: Text(
                    "CF Pursuit",
                    // softWrap: true,
                    textAlign: TextAlign.center,
                    style: GoogleFonts.robotoSlab(
                      fontSize: 50.0,
                      fontWeight: FontWeight.w400,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: deviceHeight * 0.052681,
              ),
              Container(
                height: MediaQuery.of(context).size.height * 0.2,
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: TextFormField(
                        enableSuggestions: true,
                        maxLines: 1,
                        focusNode: nameFieldNode,
                        style: GoogleFonts.openSans(color: Colors.teal),
                        onTap: () {
                          FocusScopeNode currentFocus = FocusScope.of(context);
                          if (!currentFocus.hasPrimaryFocus) {
                            currentFocus.unfocus();
                          }
                        },
                        decoration: InputDecoration(
                          labelText: "Username",
                          icon: Icon(
                            Icons.person,
                            color: nameFieldNode.hasFocus
                                ? Colors.teal
                                : Colors.white,
                          ),
                          filled: true,
                          labelStyle: GoogleFonts.roboto(color: Colors.white),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: new BorderRadius.circular(25.0),
                            borderSide: new BorderSide(
                              color: Colors.white,
                            ),
                          ),
                          border: new OutlineInputBorder(
                            borderRadius: new BorderRadius.circular(25.0),
                            borderSide: new BorderSide(
                              color: nameFieldNode.hasFocus
                                  ? Colors.teal
                                  : Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    ElevatedButton(
                      focusNode: nameSubmitNode,
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5),
                        ),
                      ),
                      onPressed: () {},
                      child: Text(
                        "Submit",
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                  ],
                ),
              ),
              FittedBox(
                  child: Container(
                      height: 70,
                      child: Text(
                        "-OR-",
                        style: GoogleFonts.openSans(
                            color: Colors.white, fontSize: 30),
                      ))),
              // Container(
              //   // height: MediaQuery.of(context).size.height * 0.25,
              //   child:
              Column(
                // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: TextFormField(
                      enableSuggestions: true,
                      maxLines: 1,
                      focusNode: instituteFieldNode,
                      onTap: () {
                        FocusScopeNode currentFocus = FocusScope.of(context);
                        if (!currentFocus.hasPrimaryFocus) {
                          currentFocus.unfocus();
                        }
                      },
                      style: GoogleFonts.openSans(color: Colors.teal),
                      decoration: InputDecoration(
                        labelText: "Institution Name",
                        icon: Icon(
                          Icons.business,
                          color: instituteFieldNode.hasFocus
                              ? Colors.teal
                              : Colors.white,
                        ),
                        labelStyle: GoogleFonts.roboto(color: Colors.white),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: new BorderRadius.circular(25.0),
                          borderSide: new BorderSide(
                            color: Colors.white,
                          ),
                        ),
                        border: new OutlineInputBorder(
                          borderRadius: new BorderRadius.circular(25.0),
                          borderSide: new BorderSide(
                            color: instituteFieldNode.hasFocus
                                ? Colors.teal
                                : Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ElevatedButton(
                    focusNode: instituteSubmitNode,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                    ),
                    onPressed: () {},
                    child: Text(
                      "Submit",
                      style: TextStyle(fontSize: 20),
                    ),
                  ),
                ],
              ),
              // ),

              // Expanded(
              //   child: Align(
              //     alignment: Alignment.bottomCenter,
              //     child: InkWell(
              //       onTap: () {},
              //       child: Container(
              //         height: deviceHeight * 0.0675852,
              //         width: deviceWidth * 0.8,
              //         decoration: BoxDecoration(
              //           gradient: LinearGradient(
              //             begin: Alignment.bottomLeft,
              //             colors: colorList,
              //             end: Alignment.topRight,
              //           ),
              //           borderRadius:
              //               BorderRadius.circular(deviceHeight * 0.02634),
              //         ),
              //         child: Row(
              //           children: [
              //             // Container(
              //             //   padding: EdgeInsets.only(left: deviceWidth * 0.011),
              //             //   child: Image.asset(
              //             //     "assets/icons/google_bg.png",
              //             //     fit: BoxFit.fitHeight,
              //             //   ),
              //             // ),
              //             // Expanded(
              //             //   child: Text(
              //             //     " Sign In with Google",
              //             //     style: GoogleFonts.roboto(
              //             //       color: Colors.white,
              //             //       fontSize: deviceHeight * 0.02711292,
              //             //     ),
              //             //     textAlign: TextAlign.center,
              //             //   ),
              //             // ),
              //           ],
              //         ),
              //       ),
              //     ),
              //   ),
              // ),
            ],
          ),
        ),
      ),
    );
  }
}

class WavyHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipPath(
      child: Container(
        height: MediaQuery.of(context).size.height * 0.223898,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.bottomLeft,
            colors: colorList,
            end: Alignment.topRight,
          ),
        ),
      ),
      clipper: BottomWave(MediaQuery.of(context).size.height,
          MediaQuery.of(context).size.height),
    );
  }
}

class BottomWave extends CustomClipper<Path> {
  double deviceHeight, deviceWidth;
  BottomWave(this.deviceHeight, this.deviceWidth);
  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0.0, size.height - deviceHeight * 0.02634);

    var secondControlPoint = Offset(size.width / 4, size.height);
    var secondEndPoint =
        Offset(size.width / 2.25, size.height - deviceHeight * 0.046096);
    path.quadraticBezierTo(secondControlPoint.dx, secondControlPoint.dy,
        secondEndPoint.dx, secondEndPoint.dy);

    var firstControlPoint = Offset(
        size.width - (size.width / 3.25), size.height - deviceHeight * 0.12775);
    var firstEndPoint =
        Offset(size.width, size.height - deviceHeight * 0.10536);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy,
        firstEndPoint.dx, firstEndPoint.dy);

    path.lineTo(size.width, size.height - deviceHeight * 0.052681);
    path.lineTo(size.width, 0.0);
    path.close();

    return path;
  }
}
