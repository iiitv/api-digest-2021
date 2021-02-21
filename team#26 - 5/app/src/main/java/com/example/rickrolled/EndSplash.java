package com.example.rickrolled;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.Handler;
import android.widget.ImageView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

public class EndSplash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_end_splash);

        ImageView endSplash = findViewById(R.id.endSplash);
        Glide.with(getApplicationContext())
                .asGif()
                .load(R.drawable.exhausted)
                .into(endSplash);

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                finish();
            }
        }, 5000);
    }

    @Override
    public void onBackPressed() {
        Toast.makeText(this, "hold up child, people are grieving", Toast.LENGTH_SHORT).show();
    }
}