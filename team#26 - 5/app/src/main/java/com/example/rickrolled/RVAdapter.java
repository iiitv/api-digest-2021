package com.example.rickrolled;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

public class RVAdapter extends RecyclerView.Adapter<RVAdapter.MyviewHolder> {

    JSONArray characters;
    Context context;
    private static final String TAG = "RVAdapter";

    public RVAdapter(Context context, JSONArray characters) {
        this.context = context;
        this.characters = characters;
    }


    @NonNull
    @Override
    public MyviewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.char_view, parent, false);
        return new MyviewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RVAdapter.MyviewHolder holder, int position) {
        try {
            JSONObject charsIndi = characters.getJSONObject(position);
            holder.charname.setText(charsIndi.getString("name"));
            holder.chargender.setText("Gender: " + charsIndi.getString("gender"));
            holder.charstatus.setText("DOA: " + charsIndi.getString("status"));
            holder.charspecies.setText("Species: " + charsIndi.getString("species") + ": " + charsIndi.getString("type"));
            holder.charorigin.setText("First seen: " + charsIndi.getJSONObject("origin").getString("name"));
            holder.charlastknown.setText("Last seen: " + charsIndi.getJSONObject("location").getString("name"));

            String imgURL = charsIndi.getString("image");
            Glide.with(context)
                    .asBitmap()
                    .load(imgURL)
                    .into(holder.charimage);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int getItemCount() {
        return characters.length();
    }

    public class MyviewHolder extends RecyclerView.ViewHolder {

        TextView charname, chargender, charstatus, charspecies, charorigin, charlastknown;
        ImageView charimage;

        public MyviewHolder(@NonNull View itemView) {
            super(itemView);
            charname = itemView.findViewById(R.id.charname);
            chargender = itemView.findViewById(R.id.chargender);
            charstatus = itemView.findViewById(R.id.charstatus);
            charspecies = itemView.findViewById(R.id.charspecies);
            charorigin = itemView.findViewById(R.id.charorigin);
            charlastknown = itemView.findViewById(R.id.charlastknown);
            charimage = itemView.findViewById(R.id.charimage);
        }
    }
}
