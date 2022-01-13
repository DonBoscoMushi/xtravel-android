package com.xtravel;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent; 
import android.os.Bundle;
import android.os.Handler;

public class Main2Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(new Intent(Main2Activity.this, MainActivity.class));
                finish();
            }
        }, 4000);
    }
}
