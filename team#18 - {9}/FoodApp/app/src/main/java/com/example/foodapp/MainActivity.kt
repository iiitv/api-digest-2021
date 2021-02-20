package com.example.foodapp

import android.content.Intent
import android.os.Bundle
import android.view.Window
import android.view.WindowManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.activity_register.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        requestWindowFeature(Window.FEATURE_NO_TITLE); //will hide the title
        supportActionBar?.hide(); // hide the title bar
//        this.window.setFlags(
//            WindowManager.LayoutParams.FLAG_FULLSCREEN,
//            WindowManager.LayoutParams.FLAG_FULLSCREEN
//        ); //enable full screen
        setContentView(R.layout.activity_main);
        setContentView(R.layout.activity_main)
        login_btn.setOnClickListener {
            if (login_mobile_no.text.toString()
                    .isEmpty() || login_password.text.toString().isEmpty()
            ) {
                Toast.makeText(this, "Give Proper Info.", Toast.LENGTH_SHORT).show();
            } else {
                var url =
                    "http://192.168.0.197/FoodAppPhp/login.php?mobileno=" + login_mobile_no.text.toString() + "&password=" +
                            login_password.text.toString()

                var rq: RequestQueue = Volley.newRequestQueue(this)
                Toast.makeText(this, "Logging In, Wait......", Toast.LENGTH_SHORT).show()
                var sr = StringRequest(Request.Method.GET, url, { response ->
                    if (response == "0") {
                        Toast.makeText(this, "Invalid Credentials", Toast.LENGTH_LONG).show()
                    } else {
                        UserInfo.mobile = login_mobile_no.text.toString()
                        Toast.makeText(this, "Logged In", Toast.LENGTH_SHORT).show()
                        var i = Intent(this, HomeActivity::class.java)
                        startActivity(i)
                    }
                }, { error ->
                    Toast.makeText(
                        this,
                        "Error:" + error.message + " Log In Failed",
                        Toast.LENGTH_LONG
                    ).show()
                })

                rq.add(sr)
            }
        }

        login_signup.setOnClickListener {
            var i = Intent(this, RegisterActivity::class.java)
            startActivity(i)
        }
    }
}
