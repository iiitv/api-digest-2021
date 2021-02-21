package com.example.rickrolled;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

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

    private Toolbar toolbar;
    RecyclerView charView;
    JSONObject jsonObject;
    JSONArray jsonArray;
    Button button, buttonnext, buttonprev, btn;
    LinearProgressIndicator progressIndicator;
    private static final String TAG = "MainActivity";
    private String CHAR_URL = "https://rickandmortyapi.com/api/character";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.hometoolbar);
        setSupportActionBar(toolbar);

//        btn=findViewById(R.id.family_tree);
//        btn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Toast.makeText(MainActivity.this, "something", Toast.LENGTH_SHORT).show();
//            }
//        });

        button = findViewById(R.id.rick_roll);
        buttonnext = findViewById(R.id.next);
        buttonprev = findViewById(R.id.prev);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), RickrollMe.class));
            }
        });
        progressIndicator = findViewById(R.id.progressbar);
        getjson();
    }

    public void getjson() {
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
                            buttonnext.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    try {
                                        progressIndicator.setVisibility(View.VISIBLE);
                                        CHAR_URL = jsonObject.getJSONObject("info").getString("next");
                                        if (CHAR_URL != null)
                                            getjson();
                                        else
                                            Toast.makeText(MainActivity.this, "Doesn't exist", Toast.LENGTH_SHORT).show();
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
                            buttonprev.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    try {
                                        progressIndicator.setVisibility(View.VISIBLE);
                                        CHAR_URL = jsonObject.getJSONObject("info").getString("prev");
                                        Log.d(TAG, "onClick: 123" + CHAR_URL);
                                        if (!CHAR_URL.equals("null")) {
                                            getjson();
                                        } else {
                                            Toast.makeText(MainActivity.this, "Doesn't exist", Toast.LENGTH_SHORT).show();
                                            progressIndicator.setVisibility(View.GONE);
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
        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        requestQueue.add(stringRequest);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        startActivity(new Intent(this, EndSplash.class));
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.home_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == R.id.family_tree) {
            startActivity(new Intent(getApplicationContext(), TreeActivity.class));
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}