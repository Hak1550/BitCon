import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import {
  colors,
  icons,
  images,
  screenHeight,
  screenWidth,
} from "../../../assets";
import I18n from "i18n-js";
import { Header } from "../../../components/Header";
import { setUserData } from "../../../core/onboarding/redux/auth";
import { setLoggedInData } from "../../../utils/storage";

const OTPScreen = (props) => {
  console.log("otp screen params", props.route.params);

  const currentLang = useSelector((state) => state.lang.defaultLang);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const { params } = useRoute();
  const payload = props.route.params?.payload;
  // let { payload } = props.route.params;

  const [OTP, setOTP] = useState();

  const [loading, setLoading] = useState(false);
  const [showReqError, setShowReqError] = useState(false);

  const styles = dynamicStyles();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(!toggle);
  }, [currentLang]);

  const verifyOTP = async () => {
    try {
      if (OTP) {
        setLoading(true);
        showReqError && setShowReqError(false);
        try {
          const confirmatiom = await payload.confirm(OTP);
          console.log("file: OTPScreen.js:57  confirmatiom:::", confirmatiom);
          dispatch(setUserData({ sign_up_req: confirmatiom?.user }));
          await setLoggedInData(confirmatiom?.user);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomStack" }],
            })
          );
          dispatch(setUserData({ sign_up_req: confirmatiom?.user }));
          console.log("confirmatiom:::", confirmatiom);
        } catch (error) {
          Alert.alert("Error", error.message);
          console.log("Invalid code.");
        } finally {
          setLoading(false);
        }
        // const verifyOtpPayload = {
        //   phone_no: payload.phone_no,
        //   otp: OTP,
        // };

        // axios
        //   .post(baseUrl + routes.verify_otp, verifyOtpPayload)
        //   .then((response) => {
        //     console.log("verify_otp response:", response.data);
        //     setLoading(false);

        //     navigation.navigate("SetPassword", verifyOtpPayload);
        //   })
        //   .catch((error) => {
        //     setLoading(false);
        //     // Handle errors
        //     if (error?.response) {
        //       console.log("Response Error:", error.response.data);
        //       Alert.alert("", error.response.data.error);
        //     } else {
        //       console.log("General Error:", error.message);
        //     }
        //   });
      } else {
        setShowReqError(true);
      }
    } catch (error) {
      console.log("try catch error while verify otp", error);
    }
  };

  // const resendOTP = () => {
  //   try {
  //     // const resendOTPPayload = {
  //     //   phone_no: payload.phone_no,
  //     // };

  //     setLoading(true);

  //     axios
  //       .post(baseUrl + routes.sendOtp, resendOTPPayload)
  //       .then((response) => {
  //         console.log("verify_otp response:", response.data);
  //         setLoading(false);
  //         Alert.alert("", response.data.msg);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         if (error?.response) {
  //           console.log("Response Error:", error.response.data);
  //           Alert.alert(
  //             "",
  //             error.response.data.error
  //               ? error.response.data.error
  //               : error.response.data.msg
  //           );
  //         } else {
  //           console.log("General Error:", error.message);
  //         }
  //       });
  //   } catch (error) {
  //     console.log("try catch error while resend otp", error);
  //   }
  // };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <Header
        // title = {'User Guides'}
        height={(screenHeight * 100) / 1000}
        width={screenWidth}
        paddingHorizontal={screenWidth * 0.02}
        // showRightIcon = {true}
        // showTitleInCenter = {true}
        leftIconSource={icons["arrow-left"]}
        tintColor={"#000000"}
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          backgroundColor: colors.white,
          paddingVertical: screenHeight * 0.08,
        }}
      >
        <Image style={styles.logo} source={images.logo} />

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
        />

        {showReqError && (
          <Text style={styles.reqFieldsErrorStyle}>
            {I18n.t("Invalid OTP")}*
          </Text>
        )}
        {/* Please enter */}
        <TouchableOpacity
          style={[styles.registerContainer, { justifyContent: "center" }]}
          onPress={() => verifyOTP()}
        >
          <Text style={styles.registerText}>{I18n.t("Submit")}</Text>
        </TouchableOpacity>

        {/* <Text style={styles.Or}>{I18n.t('OR')}</Text> */}

        {/* <TouchableOpacity onPress={() => resendOTP()}>
          <Text style={styles.Or}>{I18n.t("Resend")}</Text>
        </TouchableOpacity> */}

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

export default OTPScreen;
