package com.example.rickrolled;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.progressindicator.LinearProgressIndicator;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    RecyclerView charView;
    JSONObject jsonObject;
    JSONArray jsonArray;
    Button button, button2;
    LinearProgressIndicator progressIndicator;
    private static final String TAG = "MainActivity";
    private String CHAR_URL = "https://rickandmortyapi.com/api/character";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = findViewById(R.id.rick_roll);
        button2 = findViewById(R.id.next);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), RickrollMe.class));
            }
        });
        progressIndicator = findViewById(R.id.progressbar);

        StringRequest stringRequest = new StringRequest(Request.Method.GET, CHAR_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            jsonObject = new JSONObject(response);
                            jsonArray = jsonObject.getJSONArray("results");
                        } catch (JSONException e) {
                            e.printStackTrace();
                            Log.d(TAG, "onResponse: " + e.getMessage());
                        } finally {
                            charView = findViewById(R.id.charView);
                            RVAdapter rva = new RVAdapter(getApplicationContext(), jsonArray);
                            charView.setAdapter(rva);
                            charView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));

                            button2.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    try {
                                        progressIndicator.setVisibility(View.VISIBLE);
                                        CHAR_URL = jsonObject.getJSONObject("info").getString("next");
                                        {
                                            StringRequest stringRequest = new StringRequest(Request.Method.GET, CHAR_URL,
                                                    new Response.Listener<String>() {
                                                        @Override
                                                        public void onResponse(String response) {
                                                            try {
                                                                jsonObject = new JSONObject(response);
                                                                jsonArray = jsonObject.getJSONArray("results");
                                                            } catch (JSONException e) {
                                                                e.printStackTrace();
                                                                Log.d(TAG, "onResponse: " + e.getMessage());
                                                            } finally {
                                                                charView = findViewById(R.id.charView);
                                                                RVAdapter rva = new RVAdapter(getApplicationContext(), jsonArray);
                                                                charView.setAdapter(rva);
                                                                charView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                                                                progressIndicator.setVisibility(View.GONE);
                                                            }
                                                        }
                                                    },
                                                    new Response.ErrorListener() {
                                                        @Override
                                                        public void onErrorResponse(VolleyError error) {
                                                        }
                                                    });
                                            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                                            requestQueue.add(stringRequest);
                                        }
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                    }
                });
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        startActivity(new Intent(this, EndSplash.class));
    }
}