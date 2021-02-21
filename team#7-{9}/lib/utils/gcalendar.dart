import 'dart:developer';
import 'dart:io';
import 'package:cf_pursuit/globals.dart';
import "package:googleapis_auth/auth_io.dart";
import 'package:googleapis/calendar/v3.dart';
import 'package:url_launcher/url_launcher.dart';

class GoogleCalendar {
  // String nameOfEvent;
  // DateTime dateOfEvent;
  // googleCalendar({this.nameOfEvent, this.dateOfEvent});
  static var _scopes = [CalendarApi.calendarScope];
  Event event;
  var _credentials;
  bool initialize(
      String nameOfEvent, DateTime dateOfEvent, int durationSeconds) {
    if (Platform.isAndroid) {
      _credentials = new ClientId(googleOAuthId, "");
    }
    event = Event();
    event.location = "online";
    event.summary = nameOfEvent;
    EventDateTime start = new EventDateTime();
    start.dateTime = dateOfEvent.toLocal();
    start.timeZone = "GMT+05:30";
    event.start = start;

    EventDateTime end = new EventDateTime();
    end.timeZone = "GMT+05:30";
    end.dateTime =
        dateOfEvent.add(Duration(seconds: durationSeconds)).toLocal();
    event.end = end;
    return insertEvent(event);
  }

  bool insertEvent(event) {
    try {
      clientViaUserConsent(_credentials, _scopes, prompt)
          .then((AuthClient client) {
        var calendar = CalendarApi(client);
        String calendarId = "primary";
        calendar.events.insert(event, calendarId).then((value) {
          print("ADDEDDD_________________${value.status}");
          if (value.status == "confirmed") {
            log('Event added in google calendar');
            return true;
          } else {
            log("Unable to add event in google calendar");
            return false;
          }
        });
      });
    } catch (e) {
      log('Error creating event $e');
      return false;
    }
    return false;
  }

  void prompt(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
