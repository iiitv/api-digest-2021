package com.example.lyricsfindingapp;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import static android.content.Context.CLIPBOARD_SERVICE;
import static androidx.core.content.ContextCompat.getSystemService;

public class ProjectAdapter extends RecyclerView.Adapter<ProjectAdapter.ProjectViewHolder> {

    private Project[] projects;

    public ProjectAdapter(Project[] projects) {
        this.projects = projects;
    }

    @Override
    public int getItemCount() {
        return projects.length;
    }

    @NonNull
    @Override
    public ProjectViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_project, parent, false);
        return new ProjectViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProjectViewHolder holder, int position) {
        holder.bind(projects[position]);
    }


    static class ProjectViewHolder extends RecyclerView.ViewHolder {
        private ImageView icon;
        private TextView title;
        private TextView description;
        private CardView whole;

        public ProjectViewHolder(@NonNull View itemView) {
            super(itemView);
            icon = itemView.findViewById(R.id.image_view_icon);
            title = itemView.findViewById(R.id.text_view_title);
            description = itemView.findViewById(R.id.text_view_description);
            whole = itemView.findViewById(R.id.whole);
        }

        public void bind(Project projects) {

            title.setText(projects.title);
            description.setText(projects.description);
            icon.setImageResource(projects.image);

            if (projects.i == 1 || projects.i == 2 || projects.i == 3 || projects.i == 4 || projects.i == 8 || projects.i == 10) {
                whole.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Uri uri = Uri.parse("https://" + projects.description);
                        Intent i = new Intent(Intent.ACTION_VIEW, uri);
                        itemView.getContext().startActivity(i);
                    }
                });
            }
            if (projects.i == 5 || projects.i == 6 || projects.i == 9) {
                whole.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        ClipboardManager myClipboard;
                        myClipboard = (ClipboardManager) v.getContext().getSystemService(CLIPBOARD_SERVICE);
                        ClipData myClip;
                        if (projects.i == 5 || projects.i == 6) {
                            Toast.makeText(itemView.getContext(), "Copied " + projects.title + " no.", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(itemView.getContext(), "Copied " + projects.title + " userID.", Toast.LENGTH_SHORT).show();
                        }
                        myClip = ClipData.newPlainText("Copied " + projects.title + " no.", projects.description);
                        myClipboard.setPrimaryClip(myClip);
                    }
                });
            }

            if (projects.i == 7) {
                whole.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent emailAddressIntent = new Intent(Intent.ACTION_SENDTO);
                        emailAddressIntent.setData(Uri.parse("mailto:ankurtambe3006@gmail.com"));
                        itemView.getContext().startActivity(emailAddressIntent);
                    }
                });
            }

        }
    }
}
