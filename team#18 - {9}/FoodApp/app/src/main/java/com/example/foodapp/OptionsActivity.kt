package com.example.foodapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

import kotlinx.android.synthetic.main.activity_options.*

class OptionsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_options)

        card_order.setOnClickListener {
            var obj = Intent(this, MainActivity::class.java)
            startActivity(obj)
        }

        card_recipe.setOnClickListener {
//            var obj = Intent(this, ItemActivity::class.java)
//            startActivity(obj)
        }
    }
}