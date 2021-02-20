package com.example.foodapp

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.recipe_project.view.*

class RecipeAdapter(var context: Context, var list: ArrayList<Recipe_Info>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        var v: View = LayoutInflater.from(context).inflate(R.layout.recipe_project, parent, false)
        return ItemHolder(v)
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        (holder as ItemHolder).bind(
            list[position].recipe_id,
            list[position].title,
            list[position].publisher,
            list[position].image_url
        )
    }

    override fun getItemCount(): Int {
        return list.size
    }

    class ItemHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(i: Int, t: String, p: String, u: String) {
            itemView.title.text = t
            itemView.publisher.text = p
            var web: String = u
            web = web.replace(" ", "%20")
            Picasso.get().load(web).into(itemView.item_image)

            itemView.card_view_image_holder.setOnClickListener {

                UserInfo.selId = i

                var i = Intent(itemView.context, RecipeActivity::class.java)
                itemView.context.startActivity(i)

            }
        }
    }
}