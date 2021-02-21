import 'package:cf_pursuit/utils/user_data.dart';
import 'package:cf_pursuit/screens/profile_screen.dart';
import 'package:cf_pursuit/screens/rank_screen.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:provider/provider.dart';
import '../widgets/header.dart';

String userNameGlobal;

class LandingScreenMobile extends StatefulWidget {
  static const routeName = "/landing";
  // static String name, institute;

  @override
  _LandingScreenMobileState createState() => _LandingScreenMobileState();
}

class _LandingScreenMobileState extends State<LandingScreenMobile> {
  final FocusNode nameFieldNode = FocusNode();

  final FocusNode instituteFieldNode = FocusNode();

  final FocusNode nameSubmitNode = FocusNode();

  final FocusNode instituteSubmitNode = FocusNode();

  final ScrollController scrollController = ScrollController();

  final nameFieldKey = GlobalKey<FormState>();

  final instituteFieldKey = GlobalKey<FormState>();

  final TextEditingController nameField = TextEditingController();

  final TextEditingController instituteField = TextEditingController();
  static String institute = '', name = '';
  UserData userValidators = UserData();
  bool isValid = false;
  bool isValidData = false;
  // void _submitName(bool isValidData) {
  // isValid = isValidData;
  // print(isValidData);
  // final isValidUsername = nameFieldKey.currentState.validate();
  // if (isValidUsername) {
  //   print(nameField.text);
  //   name = nameField.text;
  //   // print(LandingScreenMobile.name.toLowerCase());
  //   // notifyListeners();
  //   Navigator.of(context).pushNamed(ProfileScreen.routeName);
  // }
  // }

  // void _submitInstituteName() {
  //   final isValidInstitute = instituteFieldKey.currentState.validate();
  //   if (isValidInstitute) {
  //     print(isValidInstitute);
  //     instituteFieldKey.currentState.save();
  //   }
  // }

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
                height: MediaQuery.of(context).size.height * 0.23,
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Form(
                        key: nameFieldKey,
                        child: TextFormField(
                          enableSuggestions: true,
                          maxLines: 1,
                          focusNode: nameFieldNode,
                          controller: nameField,
                          style: GoogleFonts.openSans(color: Colors.teal),
                          onTap: () {
                            FocusScopeNode currentFocus =
                                FocusScope.of(context);
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
                          validator: (val) {
                            if (val != null && val.length == 0) {
                              return "Username can't be of length 0";
                            }
                            return isValidData == true
                                ? null
                                : "Invalid Username";
                          },
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
                      onPressed: () async {
                        isValidData = await userValidators
                            .checkUser(nameField.text.toString());
                        setState(() {
                          isValid = isValidData;
                          name = nameField.value.toString();
                        });
                        print(isValidData);
                        final isValidUsername =
                            nameFieldKey.currentState?.validate();
                        if (isValidUsername ?? false) {
                          // Navigator.of(context)
                          //     .pushNamed(ProfileScreen.routeName);
                          Navigator.pushNamed(context, ProfileScreen.routeName,
                              arguments: {
                                "name": nameField.text.toString(),
                              });
                          nameField.clear();
                        }
                      },
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
                    style:
                        GoogleFonts.openSans(color: Colors.white, fontSize: 30),
                  ),
                ),
              ),
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Form(
                      key: instituteFieldKey,
                      child: TextFormField(
                        enableSuggestions: true,
                        maxLines: 1,
                        focusNode: instituteFieldNode,
                        controller: instituteField,
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
                        validator: (val) {
                          if (val?.length == 0) {
                            return "Institute name can't be of length 0";
                          }
                          return null;
                        },
                        onSaved: (val) {
                          institute = instituteField.text;
                          print(val);
                          Navigator.of(context).pushNamed(RankScreen.routeName);
                        },
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ElevatedButton(
                    // focusNode: instituteSubmitNode,
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(5),
                      ),
                    ),
                    onPressed: () {
                      Navigator.pushNamed(context, RankScreen.routeName,
                          arguments: {
                            "insituteName": instituteField.text.toString(),
                          });
                      instituteField.clear();
                      // _submitInstituteName();
                    },
                    child: Text(
                      "See Ranklist",
                      style: TextStyle(fontSize: 20),
                    ),
                  ),
                ],
              ),
              
                  
                  
            ],
          ),
        ),
      ),
    );
  }
}
