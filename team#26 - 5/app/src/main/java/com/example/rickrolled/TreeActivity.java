package com.example.rickrolled;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ImageView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;

import org.json.JSONException;
import org.json.JSONObject;

public class TreeActivity extends AppCompatActivity {

    private ImageView rick,beth,jerry,morty,summer;

    private static final String INDICHAR_URL = "https://rickandmortyapi.com/api/character/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tree);

        rick=findViewById(R.id.rickimg);
        beth=findViewById(R.id.bethimage);
        jerry=findViewById(R.id.jerryimage);
        morty=findViewById(R.id.mortyimage);
        summer=findViewById(R.id.summerimage);

        getimg("1", rick);
        getimg("2", morty);
        getimg("3", summer);
        getimg("4", beth);
        getimg("5", jerry);


    }

    private void getimg(String no, ImageView view){
        StringRequest request=new StringRequest(Request.Method.GET, INDICHAR_URL + no,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject object = new JSONObject(response);
                            setimg(object.getString("image"), view);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                });

        RequestQueue requestQueue= Volley.newRequestQueue(this);
        requestQueue.add(request);

    }

    private void setimg(String url, ImageView view){
        Glide.with(getApplicationContext())
                .asBitmap()
                .load(url)
                .into(view);
    }
}