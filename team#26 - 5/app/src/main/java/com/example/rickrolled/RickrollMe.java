package com.example.rickrolled;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.VideoView;

import com.bumptech.glide.Glide;

public class RickrollMe extends AppCompatActivity {

    private static final String TAG = "RickrollMe";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rickroll_me);

        ImageView sparky = findViewById(R.id.sparky);
        Glide.with(getApplicationContext())
                .asGif()
                .load(R.drawable.sparky)
                .into(sparky);

        VideoView videoView = (VideoView) findViewById(R.id.rickroll);
        videoView.setVideoPath("android.resource://" + getPackageName() + "/" + R.raw.rick_roll);

//        MediaController mediaController = new MediaController(this);
//        //link mediaController to videoView
//        mediaController.setAnchorView(videoView);
//        //allow mediaController to control our videoView
//        videoView.setMediaController(mediaController);
        videoView.start();


//        int maxTime = videoView.getDuration();
//
//        Log.d(TAG, "onCreate: "+ maxTime);
        
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                finish();
            }
        }, 18000);
    }
}