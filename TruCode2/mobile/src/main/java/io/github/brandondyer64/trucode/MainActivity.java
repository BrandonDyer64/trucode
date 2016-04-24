package io.github.brandondyer64.trucode;

import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

public class MainActivity extends AppCompatActivity {

    private GLSurfaceView surface;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        surface = (GLSurfaceView) findViewById(R.id.surfaceView);
        surface.setEGLContextClientVersion(2);
        surface.setRenderer(new MyGLRenderer(getIntent().getStringExtra("code")));

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

}
