package io.beetkom;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import java.util.Objects;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "Beetkom";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegateWrapper(
                this,
                new DefaultReactActivityDelegate(
                        this,
                        Objects.requireNonNull(getMainComponentName()),
                        DefaultNewArchitectureEntryPoint.getFabricEnabled(),
                        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()
                )
        );
    }
}
