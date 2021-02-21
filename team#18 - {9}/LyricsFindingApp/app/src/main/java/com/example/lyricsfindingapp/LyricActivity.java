package com.example.lyricsfindingapp;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class LyricActivity extends AppCompatActivity {

    private TextView txtLyrics;
    private TextView heading;

    String url;
    RequestQueue requestQueue;

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lyric);
        txtLyrics = findViewById(R.id.txtLyrics);
        heading = findViewById(R.id.txtHeading);

        String artistName = getIntent().getStringExtra("Artist");
        String songName = getIntent().getStringExtra("Song");
        heading.setText(songName + " - " + artistName);
        Toast.makeText(getApplicationContext(), "Searching.....", Toast.LENGTH_SHORT).show();

        if (isOnline()) {
            url = "https://api.lyrics.ovh/v1/" + artistName + "/" + songName;
            url.replaceAll(" ", "%20");

            requestQueue = Volley.newRequestQueue(LyricActivity.this);
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null,
                    new Response.Listener() {
                        @Override
                        public void onResponse(Object response) {
                            try {
                                JSONObject jsonObject = new JSONObject(response.toString());
                                txtLyrics.setText(jsonObject.getString("lyrics"));
                                if (txtLyrics.getText().toString().isEmpty())
                                    txtLyrics.setText("Error occurred, may be because of-\n************************\n1. Improper or No Internet Connectivity\n2. Either there is a Typo, or the entered song does not exist\n3. As this is a free service, it only includes international hits");
                            } catch (JSONException e) {
                                e.printStackTrace();
                                txtLyrics.setText("Error occurred, may be because of-\n************************\n1. Improper or No Internet Connectivity\n2. Either there is a Typo, or the entered song does not exist\n3. As this is a free service, it only includes international hits");
                            }
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            txtLyrics.setText("Error occurred, may be because of-\n************************\n1. Improper or No Internet Connectivity\n2. Either there is a Typo, or the entered song does not exist\n3. As this is a free service, it only includes international hits");
                        }
                    });
            requestQueue.add(jsonObjectRequest);
        } else {
            txtLyrics.setText("No Internet Connection");

        }
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public boolean isOnline() {
        ConnectivityManager conMgr = (ConnectivityManager) getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = conMgr.getActiveNetworkInfo();

        if (netInfo == null || !netInfo.isConnected() || !netInfo.isAvailable()) {
            Toast.makeText(this, "No Internet connection!", Toast.LENGTH_SHORT).show();
            return false;
        }
        return true;
    }
}
