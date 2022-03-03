package com.xtravel;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TextView;

public class TypeWriter extends TextView {

    private CharSequence aText;
    private int mIndex;
    private long mDelay = 150;

    public TypeWriter(Context context) {
        super(context);
    }

    public TypeWriter(Context context, AttributeSet attrs) {
        super(context, attrs)
    }

    private Handler mHandler = new Handler();

    private Runnable characterAdder = new Runnable() {

        
    };
}