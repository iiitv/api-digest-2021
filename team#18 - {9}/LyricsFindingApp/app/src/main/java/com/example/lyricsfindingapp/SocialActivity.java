package com.example.lyricsfindingapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

public class SocialActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_social);
        RecyclerView recyclerView = findViewById(R.id.recycler_view);

        Project[] projects = {
                new Project(1, "Instagram", "instagram.com/ankur.tambe/", R.drawable.ic_instagram),
                new Project(2, "Github", "github.com/AnkurTambe", R.drawable.ic_github),
                new Project(3, "Twitter", "twitter.com/ankurtambe30", R.drawable.ic_twitter),
                new Project(4, "LinkedIn", "linkedin.com/in/ankur-tambe-15b595192", R.drawable.ic_linkedin),
                new Project(5, "WhatsApp", "+91-9998252337", R.drawable.ic_whatsapp),
                new Project(6, "Telegram", "+91-9998252337", R.drawable.ic_telegram),
                new Project(7, "Gmail", "ankurtambe3006@gmail.com", R.drawable.ic_gmail),
                new Project(8, "Reddit", "reddit.com/user/ankurtambe", R.drawable.ic_reddit),
                new Project(9, "Discord", "ankurtambe#3185", R.drawable.ic_discord),
                new Project(10, "Pinterest", "pinterest.com/ankurtambe3006", R.drawable.ic_pinterest)
        };

        ProjectAdapter pA = new ProjectAdapter(projects);
        recyclerView.setAdapter(pA);
    }
}