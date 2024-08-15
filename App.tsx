import { useEffect } from "react";
import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { MenuProvider } from "react-native-popup-menu";
import { TranslationProvider, ActionSheetProvider } from "./src/core/dopebase";
import AppContent from "./src/AppContent";
import translations from "./src/translations";
import { AuthProvider } from "./src/core/onboarding/hooks/useAuth";
import { authManager } from "./src/core/onboarding/api";
import { persistStore, persistReducer } from "redux-persist";
import { appReducer } from "./src/redux/reducers";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppCheck from "@react-native-firebase/app-check";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const App = () => {
  console.log("check rerender");
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs(true);
  }, []);

  useEffect(() => {
    const initializeAppCheck = async () => {
      try {
        const rnfbProvider =
          AppCheck().newReactNativeFirebaseAppCheckProvider();
        rnfbProvider.configure({
          android: {
            provider: __DEV__ ? "debug" : "playIntegrity",
            debugToken: "81104371-AF33-4DC0-9E5D-D426819452A8",
          },
          apple: {
            provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
            debugToken:
              "DA729029-FBF3-4525-8805-F2D7E2FECAE0",
          },
          web: {
            provider: "reCaptchaV3",
            siteKey: "unknown",
          },
        });
        AppCheck().initializeAppCheck({
          provider: rnfbProvider,
          isTokenAutoRefreshEnabled: true,
        });
        try {
          const { token } = await AppCheck().getToken(true);
          if (token.length > 0) {
            console.log("AppCheck verification passed");
          }
        } catch (error) {
          throw new Error(error);
        }
      } catch (error) {
        console.log("error:::", error);
      }
    };
    initializeAppCheck();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TranslationProvider translations={translations}>
          {/* <DopebaseProvider theme={theme}> */}
          <AuthProvider authManager={authManager}>
            <MenuProvider>
              <ActionSheetProvider>
                <AppContent />
              </ActionSheetProvider>
            </MenuProvider>
          </AuthProvider>
          {/* </DopebaseProvider> */}
        </TranslationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;