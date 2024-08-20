import React, { useEffect, useLayoutEffect } from "react";
import { Image, Platform } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { screenHeight, screenWidth } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInData } from "../../utils/storage";
import { setUserData } from "../../core/onboarding/redux/auth";

const Splash = ({ navigation }) => {
  const token = useSelector((state) => state.auth?.user?.sign_up_req?.token);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("current state", state);

  useEffect(() => {
    setTimeout(() => {
      redirectScreen()
    }, Platform.OS === "ios" ? 1000 : 3000);
  }, []);

  const redirectScreen = async () => {
    const userData = await getLoggedInData();

    console.log('userData', userData);

    if (userData) {
      dispatch(setUserData({ sign_up_req: userData }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "BottomStack" }],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginStack" }],
        })
      );
    }
  };

  return (
    <Image
      style={{ height: screenHeight, width: screenWidth }}
      source={require("../../assets/images/Splash.png")}
    />
  );
};
export default Splash;
