import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  I18nManager,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dynamicStyles from "./styles";
import { useSelector } from "react-redux";
import { switchLang } from "../../../core/onboarding/redux/language";
import {
  colors,
  fontSize,
  fontWeight,
  icons,
  images,
  screenHeight,
  screenWidth,
} from "../../../assets";
import I18n from "i18n-js";
import axios from "axios";
import { baseUrl, routes } from "../../../apis";
import PhoneInput from "react-native-phone-number-input";
import auth from "@react-native-firebase/auth";

const SignupScreen = () => {
  const currentLang = useSelector((state) => state.lang.defaultLang);
  const navigation = useNavigation();
  const styles = dynamicStyles();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [showReqError, setShowReqError] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    setToggle(!toggle);
  }, [currentLang]);

  const onPressRegister = () => {
    try {
      if (phoneNumber) {
        // console.log("pass");
        // showReqError && setShowReqError(false);

        // console.log("after");

        // const payload = {
        //   name: name,
        //   phone_no: phoneNumber,
        // };

        setLoading(true);

        const signInWithPhoneNumber = async () => {
          console.log({ phoneNumber });
          // Alert.alert("Error", "Something went wrong")
          try {
            const result = await auth().signInWithPhoneNumber(phoneNumber);
            console.log("result:::", result);
            navigation.navigate("OTP", { payload: result });
          } catch (error) {
            Alert.alert("Error", error.message)
            console.error("Error signing in with phone number:", error);
          }
        };
        signInWithPhoneNumber();
        // axios
        //   .post(baseUrl + routes.sign_up, payload)
        //   .then((response) => {
        //     console.log("sign-up response:", response.data);
        //     setLoading(false);

        //     // navigation.navigate("OTP", {
        //     //   navigationType: "resgistration",
        //     //   payload,
        //     // });
        //   })
        //   .catch((error) => {
        //     setLoading(false);
        //     // Handle errors
        //     if (error?.response) {
        //       console.log("Response Error:", error.response.data);
        //       Alert.alert(
        //         "",
        //         error.response.data.error
        //           ? error.response.data.error
        //           : error.response.data.msg
        //       );
        //     } else {
        //       console.log("General Error:", error.message);
        //     }
        //   });
      } else {
        setShowReqError(true);
      }
    } catch (error) {
      Alert.alert("Error", error)
      console.log("try catch error while sign-up", error);
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

  const centerIcon = {
    marginVertical: screenHeight * 0.01,
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    // backgroundColor:'red'
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
        {/* <Image style={styles.logo} source={images.logo} /> */}

        <View style={{ flexDirection: "row" }}>
          <Image source={icons["simplelogo"]} style={centerIcon} />
          <Text
            style={{
              color: "#222222",
              fontSize: fontSize["4.5"],
              alignSelf: "center",
              alignContent: "center",
              marginTop: screenHeight * 0.055,
              fontWeight: fontWeight[800],
            }}
          >
            {I18n.t("Beetkom")}
          </Text>
        </View>

        <Text style={styles.title}>{I18n.t("Register")}</Text>
        {/* <TextInput
          style={styles.InputContainer}
          placeholder={I18n.t("Name")}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={(text) => setName(text)}
          value={name}
        /> */}
        {/* <TextInput/>
          style={styles.InputContainer}
          placeholder={I18n.t('Phone Number')}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        /> */}

        <View
          style={{
            width: (screenWidth * 800) / 1000,
            marginTop: screenHeight * 0.02,
          }}
        >
          <PhoneInput
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
            defaultValue={phoneNumber}
            defaultCode="TR"
            layout="first"
            onChangeFormattedText={(text) => {
              // console.log('onChangeFormattedText', text, text.length)
              // if(text.length<=9){
              // console.log('inside');

              setPhoneNumber(text);
              // }
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
          onPress={() => onPressRegister()}
        >
          <Text style={styles.registerText}>{I18n.t("Register")}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.contAsGuest}>
            {I18n.t("Already have an account")} ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.guest}> {I18n.t("Login")} </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleAsGuest()}>
          <Text style={styles.contAsGuest}>
            {I18n.t("Continue as a")}
            <Text style={styles.guest}>{I18n.t("Guest")}</Text>
          </Text>
        </TouchableOpacity>

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

export default SignupScreen;
