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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    RecyclerView charView;
    JSONObject jsonObject;
    JSONArray jsonArray;
    Button button;
    private static final String TAG = "MainActivity";
    private static final String CHAR_URL = "https://rickandmortyapi.com/api/character";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button=findViewById(R.id.nextscr);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), RickrollMe.class));
            }
        });

        StringRequest stringRequest=new StringRequest(Request.Method.GET, CHAR_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            jsonObject = new JSONObject(response);
                            jsonArray = jsonObject.getJSONArray("results");

                        } catch (JSONException e) {
                            e.printStackTrace();
                            Log.d(TAG, "onResponse: "+e.getMessage());
                        }
                        finally {
                            charView = findViewById(R.id.charView);
                            RVAdapter rva = new RVAdapter(getApplicationContext(), jsonArray);
                            charView.setAdapter(rva);
                            charView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });

        RequestQueue requestQueue= Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        startActivity(new Intent(this, EndSplash.class));
    }
}