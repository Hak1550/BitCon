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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
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

  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screenName, setScreenName] = useState<screens>("Login");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [OTP, setOTP] = useState<any>();
  const [showReqError, setShowReqError] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const onAuthStateChanged = async (user) => {
    if (user) {
      await setLoggedInData(user);
      dispatch(setUserData({ sign_up_req: user }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomStack" }],
        })
      );
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // const signInWithPhoneNumber = async () => {
  //   try {
  //     showReqError && setShowReqError(false);
  //     if (phoneNo?.length < 9) {
  //       Alert.alert('Error', "Please enter valid phone number");
  //       return;
  //     }
  //     setLoading(true);
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNo);
  //     setPayload(confirmation);
  //     setScreenName("OTP");
  //   } catch (error) {
  //     console.log("🚀 ~ signInWithPhoneNumber ~ error:", error);
  //     setShowReqError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // Function to send SMS verification code
  // const signInWithPhoneNumber = async () => {
  //   try {
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNo);
  //     setPayload(confirmation);
  //     setScreenName("OTP");
  //   } catch (error) {
  //         setShowReqError(true);
  //     if (error.code === "auth/quota-exceeded") {
  //       console.error("SMS quota exceeded, please try again later.");
  //     } else if (error.code === "auth/invalid-phone-number") {
  //       console.error("Invalid phone number format.");
  //     } else {
  //       console.error("SMS verification failed:", error.message);
  //     }
  //   }
  // };
  // Function to sign in an existing user
  const signInUser = async () => {
    try {
      setLoading(true);

      let confirmation = await auth().signInWithEmailAndPassword(
        email,
        password
        );
        console.log("User signed ", confirmation);
      await setLoggedInData(confirmation?.user);
      dispatch(setUserData({ sign_up_req: confirmation?.user }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomStack" }],
        })
      );
      ToastAndroid.show(
        "Login Successfulyy",
        ToastAndroid.SHORT
      );

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

      // console.error(error.message);
      // await setLoggedInData(confirmation?.user);
      // dispatch(setUserData({ sign_up_req: confirmation?.user }));
    }
  };

  // Function to verify the SMS code
  // const confirmCode = async (confirmation, code) => {
  //   try {
  //     await confirmation.confirm(code);
  //     console.log('Phone number verified successfully!');
  //   } catch (error) {
  //     console.error('SMS verification code confirmation failed:', error);
  //     throw error;
  //   }
  // };

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
      ToastAndroid.show(
        "User registered successfully",
        ToastAndroid.SHORT
      );


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

  console.log("email", email, password);

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

        {screenName === "Login" || screenName === "Register" ? (
          <>
            <Text style={styles.title}>{I18n.t(screenName)}</Text>
            <View
              style={{
                width: (screenWidth * 800) / 1000,
                marginTop: screenHeight * 0.02,
              }}
            >
              {/* <PhoneInput
                placeholder={I18n.t("Phone Number")}
                containerStyle={{
                  borderRadius: (screenHeight * 25) / 1000,
                  borderWidth: 1,
                  borderColor: colors.textInputBorderColor,
                }}
                textContainerStyle={{
                  alignItems: "center",
                  height: screenHeight * 0.06,
                  paddingVertical: screenHeight * 0.002,
                  borderTopRightRadius: (screenHeight * 25) / 1000,
                  borderBottomEndRadius: (screenHeight * 25) / 1000,
                }}
                defaultValue={phoneNo}
                defaultCode="TR"
                layout="first"
                onChangeFormattedText={(text) => {
                  setPhoneNo(text);
                }}
              /> */}
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
            </View>
            {showReqError && (
              <Text style={styles.reqFieldsErrorStyle}>
                {I18n.t("Please enter valid data")}*
              </Text>
            )}
            <TouchableOpacity
              style={[styles.registerContainer, { justifyContent: "center" }]}
              disabled={!email || !password}
              onPress={
                screenName === "Login"
                  ? () => signInUser()
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

            <TouchableOpacity onPress={() => handleAsGuest()}>
              <Text style={styles.contAsGuest}>
                {I18n.t("Continue as a")}
                <Text style={styles.guest}>{I18n.t("Guest")} </Text>
              </Text>
            </TouchableOpacity>
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
