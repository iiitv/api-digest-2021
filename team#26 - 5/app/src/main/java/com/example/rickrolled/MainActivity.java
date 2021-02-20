package com.example.rickrolled;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import android.os.Bundle;
import android.widget.TextView;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView=findViewById(R.id.tvresult);

        Retrofit retrofit=new Retrofit.Builder()
                .baseUrl("https://rickandmortyapi.com/api/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        RickandMortyApi mortyApi = retrofit.create(RickandMortyApi.class);

        Call<List<data>> call = mortyApi.get_results();

        call.enqueue(new Callback<List<data>>() {
            @Override
            public void onResponse(Call<List<data>> call, Response<List<data>> response) {
                if(!response.isSuccessful()){
                    textView.setText("Code: "+response.code());
                    return;
                }
                List<data> list=response.body();

                for(data d : list){
                    String content="";
                    content+="Name: "+d.getName()+"\n";
                    content+="Alive: "+d.getStatus()+"\n\n";

                    textView.append(content);
                }
            }

            @Override
            public void onFailure(Call<List<data>> call, Throwable t) {
                textView.setText(t.getMessage()+"error");
            }
        });
    }
}