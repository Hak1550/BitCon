import auth from "@react-native-firebase/auth";
import { useNavigation, CommonActions } from "@react-navigation/core";
import I18n from "i18n-js";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  colors,
  fontSize,
  icons,
  screenHeight,
  screenWidth,
} from "../../../assets";
import { Header } from "../../../components/Header";
import dynamicStyles from "./styles";
import { setLoggedInData } from "../../../utils/storage";
import { setUserData } from "../../../core/onboarding/redux/auth";

type screens = "Login" | "Register" | "OTP";

const AuthScreen = () => {
  const currentLang = useSelector((state: any) => state.lang.defaultLang);
  const navigation = useNavigation<any>();
  const styles = dynamicStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [password, setPassword] = useState("");
  const [screenName, setScreenName] = useState<screens>("Login");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [OTP, setOTP] = useState<any>();
  const [showReqError, setShowReqError] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const signInUser = async () => {
    try {
      setLoading(true);

      let confirmation = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      if (rememberMe) {
        await setLoggedInData(confirmation?.user);
        dispatch(setUserData({ sign_up_req: confirmation?.user }));
      } else {
        dispatch(setUserData({ sign_up_req: confirmation?.user }));
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomStack" }],
        })
      );
      ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("User signed error", error, error?.code, error?.message);

      let code = error?.code;
      if (code === "auth/invalid-credential") {
        ToastAndroid.show(
          "Email/password is not correct or not registered",
          ToastAndroid.SHORT
        );
      } else if (code === "auth/invalid-email") {
        ToastAndroid.show(
          "The email address is badly formatted.",
          ToastAndroid.SHORT
        );
      } else if (code === "auth/weak-password") {
        ToastAndroid.show("Password is week.", ToastAndroid.SHORT);
      }
    }
  };

  const resetPassword = async () => {
    try {
      if (!email) {
        ToastAndroid.show(
          "Please enter your email address",
          ToastAndroid.SHORT
        );
        return;
      }

      await auth().sendPasswordResetEmail(email);
      ToastAndroid.show(
        "Password reset email sent. Please check your inbox.",
        ToastAndroid.LONG
      );
    } catch (error) {
      console.log("Password reset error", error, error?.code, error?.message);

      let code = error?.code;
      if (code === "auth/invalid-email") {
        ToastAndroid.show(
          "The email address is badly formatted.",
          ToastAndroid.SHORT
        );
      } else if (code === "auth/user-not-found") {
        ToastAndroid.show(
          "There is no user corresponding to this email.",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show(
          "Something went wrong. Please try again.",
          ToastAndroid.SHORT
        );
      }
    }
  };

  const confirmCode = async () => {
    try {
      showReqError && setShowReqError(false);

      setLoading(true);
      await payload.confirm(OTP);
      const confirmation = await payload.confirm(OTP);
      await setLoggedInData(confirmation?.user);
      dispatch(setUserData({ sign_up_req: confirmation?.user }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomStack" }],
        })
      );
      console.log("confirmation:::", confirmation);
    } catch (error) {
      setShowReqError(true);
      console.log("Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsGuest = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "BottomStack" }],
      })
    );
  };
  const onPressRegister = async () => {
    try {
      setLoading(true);

      let confirmation = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("confirmation", confirmation);
      // Update the user profile with the username
      await confirmation.user.updateProfile({
        displayName: username, // 'username' is the value you want to set
      });
      console.log("confirmation 1", confirmation);
      setEmail("");
      setPassword("");
      setUsername("");
      setScreenName("Login");
      dispatch(setUserData({ sign_up_req: confirmation?.user }));
      ToastAndroid.show("User registered successfully", ToastAndroid.SHORT);

      setLoading(false);

      console.log("User account created & signed in!", confirmation);
    } catch (error) {
      let code = error?.code;
      if (code === "auth/email-already-in-use") {
        ToastAndroid.show(
          "The email address is already in use by another account.",
          ToastAndroid.SHORT
        );
      } else if (code === "auth/invalid-email") {
        ToastAndroid.show(
          "The email address is badly formatted.",
          ToastAndroid.SHORT
        );
      } else if (code === "auth/weak-password") {
        ToastAndroid.show("The given password is invalid.", ToastAndroid.SHORT);
      }

      console.log("User account created error", error?.code, error);

      setLoading(false);
    }
  };
  const toggleRememberME = () => {
    console.log("toggleRememberME", rememberMe);

    setRememberMe((prev) => !prev);
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          backgroundColor: colors.white,
          paddingVertical: screenHeight * 0.08,
        }}
      >
        {screenName === "OTP" && (
          <Header
            height={(screenHeight * 100) / 1000}
            width={screenWidth}
            paddingHorizontal={screenWidth * 0.02}
            leftIconSource={icons["arrow-left"]}
            tintColor={"#000000"}
            onBackPress={() => setScreenName("Login")}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          <Image
            source={icons["simplelogo"]}
            style={{
              marginVertical: screenHeight * 0.01,
              width: screenHeight * 0.1,
              height: screenHeight * 0.1,
            }}
          />
          <Text
            style={{
              color: "#222222",
              fontSize: fontSize["4.5"],
              alignSelf: "center",
              alignContent: "center",
              marginTop: screenHeight * 0.055,
              fontWeight: "800",
            }}
          >
            {I18n.t("Beetkom")}
          </Text>
        </View>

        {screenName === "Login" ||
        screenName === "Register" ||
        screenName === "Reset Password" ? (
          <>
            <Text style={styles.title}>{I18n.t(screenName)}</Text>
            <View
              style={{
                width: (screenWidth * 800) / 1000,
                marginTop: screenHeight * 0.02,
              }}
            >
              {screenName == "Register" && (
                <TextInput
                  placeholder={I18n.t("Name")}
                  value={username}
                  autoCapitalize="none"
                  onChangeText={(e) => setUsername(e)}
                  style={{
                    height: screenHeight * 0.06,
                    paddingVertical: screenHeight * 0.002,
                    borderTopRightRadius: (screenHeight * 25) / 1000,
                    borderBottomEndRadius: (screenHeight * 25) / 1000,
                    borderRadius: (screenHeight * 25) / 1000,
                    borderWidth: 1,
                    borderColor: colors.textInputBorderColor,
                    padding: 10,
                    margin: 5,
                  }}
                />
              )}
              <TextInput
                placeholder={I18n.t("Email")}
                value={email}
                autoCapitalize="none"
                onChangeText={(e) => setEmail(e)}
                style={{
                  height: screenHeight * 0.06,
                  paddingVertical: screenHeight * 0.002,
                  borderTopRightRadius: (screenHeight * 25) / 1000,
                  borderBottomEndRadius: (screenHeight * 25) / 1000,
                  borderRadius: (screenHeight * 25) / 1000,
                  borderWidth: 1,
                  borderColor: colors.textInputBorderColor,
                  padding: 10,
                  margin: 5,
                }}
              />
              {screenName !== "Reset Password" && (
                <TextInput
                  secureTextEntry
                  placeholder={I18n.t("Password")}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(e) => setPassword(e)}
                  style={{
                    height: screenHeight * 0.06,
                    paddingVertical: screenHeight * 0.002,
                    borderTopRightRadius: (screenHeight * 25) / 1000,
                    borderBottomEndRadius: (screenHeight * 25) / 1000,
                    borderRadius: (screenHeight * 25) / 1000,
                    borderWidth: 1,
                    borderColor: colors.textInputBorderColor,
                    padding: 10,
                    margin: 5,
                  }}
                />
              )}
            </View>
            {showReqError && (
              <Text style={styles.reqFieldsErrorStyle}>
                {I18n.t("Please enter valid data")}*
              </Text>
            )}
            {screenName === "Login" && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: (screenWidth * 750) / 1000,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleRememberME}
                    style={{ height: 25, width: 25, zIndex: 1 }}
                  >
                    <Checkbox
                      style={styles.checkbox}
                      value={rememberMe}
                      // onChange={toggleRememberME}
                    />
                  </TouchableOpacity>
                  <Text>Remember Me</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setScreenName("Reset Password")}
                >
                  <Text>Forget Password?</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[styles.registerContainer, { justifyContent: "center" }]}
              disabled={!email}
              onPress={
                screenName === "Login"
                  ? () => signInUser()
                  : screenName === "Reset Password"
                  ? () => resetPassword()
                  : () => onPressRegister()
              }
            >
              <Text style={styles.registerText}>{I18n.t(screenName)}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.contAsGuest}>
                {I18n.t(
                  screenName == "Login"
                    ? "Not a member"
                    : screenName == "Reset Password"
                    ? "Go back to"
                    : "Already have an account"
                )}{" "}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setScreenName(screenName == "Login" ? "Register" : "Login")
                }
              >
                <Text style={styles.guest}>
                  {" "}
                  {I18n.t(
                    screenName == "Login" ? "Register Here" : "Login"
                  )}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            {screenName !== "Reset Password" && (
              <TouchableOpacity onPress={() => handleAsGuest()}>
                <Text style={styles.contAsGuest}>
                  {I18n.t("Continue as a")}
                  <Text style={styles.guest}>{I18n.t("Guest")} </Text>
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <Text style={styles.title}>{I18n.t("OTP")}</Text>
            <Text style={styles.otpDescription}>
              {I18n.t(
                "Enter the OTP that we have sent to your registered phone number"
              )}
            </Text>
            <TextInput
              style={styles.InputContainer}
              keyboardType="number-pad"
              placeholder={I18n.t("Enter the OTP")}
              placeholderTextColor={colors.placeholderTextColor}
              onChangeText={(text) => setOTP(text)}
              value={OTP}
              secureTextEntry
            />
            {showReqError && (
              <Text style={styles.reqFieldsErrorStyle}>
                {I18n.t("Invalid OTP")}*
              </Text>
            )}
            <TouchableOpacity
              style={[styles.registerContainer, { justifyContent: "center" }]}
              onPress={confirmCode}
            >
              <Text style={styles.registerText}>{I18n.t("Submit")}</Text>
            </TouchableOpacity>
          </>
        )}

        {loading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: screenHeight * 0.44,
              left: screenWidth * 0.44,
            }}
            size={"large"}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AuthScreen;
