package com.example.foodapp

import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_item.*
import kotlinx.android.synthetic.main.activity_start.*
import kotlinx.android.synthetic.main.activity_start.item_rv
import org.json.JSONArray
import org.json.JSONObject

class StartActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start)

        var pg: Int = 1
        var search = search_bar.text.toString()

//        if (search_bar.text.toString().isEmpty()){
//            Search For
//        }


        var url =
            "https://recipesapi.herokuapp.com/api/search?q=$search&page=${pg.toString()}"
        var list1 = ArrayList<Recipe_Info>()
        var rq: RequestQueue = Volley.newRequestQueue(this)
        var jar = JsonArrayRequest(Request.Method.GET, url, null, { response ->
            JSONObject jo = new JSONObject()
            JSONArray ja = jsonO
                    for (x in 0 until response.length())
//                list1.add(
//                    Recipe_Info(
//                        response.getJSONObject(x).getInt("recipe_id"),
//                        response.getJSONObject(x).getString("title"),
//                        response.getJSONObject(x).getString("publisher"),
//                        response.getJSONObject(x).getString("image_url")
//                    )
//                )

            var adp = RecipeAdapter(this, list1)
            item_rv.layoutManager = LinearLayoutManager(this)
            item_rv.adapter = adp

        }, { error ->
            Toast.makeText(this, error.message, Toast.LENGTH_LONG).show()
        })

        rq.add(jar)
    }
}