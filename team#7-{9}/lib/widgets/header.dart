import 'package:flutter/material.dart';
import 'package:cf_pursuit/globals.dart';
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
