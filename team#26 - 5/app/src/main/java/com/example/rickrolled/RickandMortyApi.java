package com.example.rickrolled;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface RickandMortyApi {

    @GET("character")
    Call<List<data>> get_results();
}
