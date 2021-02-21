package com.example.lyricsfindingapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.RequestQueue;

public class MainActivity extends AppCompatActivity {

    private EditText edtArtistName, edtArtistSong;
    private Button btnGetLyrics;
    TextView knowMore;

    String url;
    RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtArtistName = findViewById(R.id.edit_text_artist_name);
        edtArtistSong = findViewById(R.id.edit_text_song_name);
        btnGetLyrics = findViewById(R.id.button_get_lyrics);
        knowMore = findViewById(R.id.know_more);

        btnGetLyrics.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (edtArtistName.getText().toString().isEmpty() || edtArtistSong.getText().toString().isEmpty()
                ) {
                    Toast.makeText(MainActivity.this, "Give Proper Information", Toast.LENGTH_SHORT).show();
                } else {
                    String aname = edtArtistName.getText().toString();
                    String sname = edtArtistSong.getText().toString();

                    Intent lyricsActivityIntent = new Intent(MainActivity.this, LyricActivity.class);
                    lyricsActivityIntent.putExtra("Artist", aname);
                    lyricsActivityIntent.putExtra("Song", sname);

                    startActivity(lyricsActivityIntent);
                }
            }
        });

        knowMore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent moreActivityIntent = new Intent(MainActivity.this, KnowActivity.class);
                startActivity(moreActivityIntent);
            }
        });
    }
}
