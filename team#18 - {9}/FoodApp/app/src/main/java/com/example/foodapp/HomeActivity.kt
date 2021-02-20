package com.example.foodapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        card_pizza.setOnClickListener {
            var cat: String = "Pizza"
            var obj = Intent(this, ItemActivity::class.java)
            obj.putExtra("cat", cat)
            startActivity(obj)
        }

        card_sandwich.setOnClickListener {
            var cat: String = "Sandwich"
            var obj = Intent(this, ItemActivity::class.java)
            obj.putExtra("cat", cat)
            startActivity(obj)
        }

        card_salad.setOnClickListener {
            var cat: String = "Salad"
            var obj = Intent(this, ItemActivity::class.java)
            obj.putExtra("cat", cat)
            startActivity(obj)
        }

        card_beverages.setOnClickListener {
            var cat: String = "Beverages"
            var obj = Intent(this, ItemActivity::class.java)
            obj.putExtra("cat", cat)
            startActivity(obj)
        }

        card_extra.setOnClickListener {
            var cat: String = "Extra"
            var obj = Intent(this, ItemActivity::class.java)
            obj.putExtra("cat", cat)
            startActivity(obj)
        }
    }

    override fun onBackPressed() {

        val alert = AlertDialog.Builder(this)
        alert.setCancelable(false)
        alert.setTitle("Alert")
        alert.setMessage("Do you want to switch user")
        alert.setPositiveButton(
            "Yes"
        ) { dialogInterface, i -> startActivity(Intent(this, MainActivity::class.java)) }
        alert.setNegativeButton(
            "No"
        ) { dialogInterface, i -> }
        val alertDialog: AlertDialog = alert.create()
        alert.show()

    }
}