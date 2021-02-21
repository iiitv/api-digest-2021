package com.example.rickrolled;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

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

        click("1", rick);
        click("2", morty);
        click("3", summer);
        click("4", beth);
        click("5", jerry);


    }

    private void click(String no, ImageView v){
        v.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                StringRequest request=new StringRequest(Request.Method.GET, INDICHAR_URL + no,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    JSONObject object = new JSONObject(response);
                                    Bundle bundle=new Bundle();
                                    bundle.putString("name", object.getString("name"));
                                    bundle.putString("gender", object.getString("gender"));
                                    bundle.putString("species", object.getString("species"));
                                    bundle.putString("status", object.getString("status"));
                                    bundle.putString("origin", object.getJSONObject("origin").getString("name"));
                                    bundle.putString("location", object.getJSONObject("location").getString("name"));
                                    bundle.putString("image", object.getString("image"));

                                    InfoFragment fragment=new InfoFragment();
                                    fragment.setArguments(bundle);
                                    getSupportFragmentManager().beginTransaction().replace(R.id.fragment, fragment).addToBackStack("New Fragment").commit();
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

                RequestQueue requestQueue= Volley.newRequestQueue(getApplicationContext());
                requestQueue.add(request);
            }
        });
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
//
//    public void showCustomAlertDialog(Context context, String name) {
//        final AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
//                context);
//        LayoutInflater inflater = (LayoutInflater) context
//                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
//        View view = inflater.inflate(R.layout.char_details, null);
//        alertDialogBuilder.setView(view);
//        alertDialogBuilder.setCancelable(false);
//        final AlertDialog dialog = alertDialogBuilder.create();
//        dialog.show();
//        TextView nam=view.findViewById(R.id.charname);
//        nam.setText(name);
//        TextView gend=view.findViewById(R.id.chargender);
//        gend.setText("");
//        TextView status = view.findViewById(R.id.charstatus);
//        status.setText("");
//        TextView specie= view.findViewById(R.id.charspecies);
//        specie.setText("");
//
//        dialog.show();
//
//    }
}