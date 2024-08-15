import React, { useEffect, useState } from "react";
import {
  FlatList,
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import dynamicStyles from "./styles";
import { useSelector } from "react-redux";
import I18n from "i18n-js";
import { Header } from "../../components/Header";
import {
  colors,
  fontSize,
  fontWeight,
  icons,
  screenHeight,
  screenWidth,
} from "../../assets";
import { switchLang } from "../../core/onboarding/redux/language";
import Modal from "react-native-modal";
import WebView from "react-native-webview";
import { setUserData } from "../../core/onboarding/redux/auth";
import { clearAllLoggedData } from "../../utils/storage";
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.lang.defaultLang);
  const User = useSelector((state) => state?.auth?.user?.sign_up_req);
  const [toggle, setToggle] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const styles = dynamicStyles();

  useEffect(() => {
    setToggle(!toggle);
  }, [currentLang]);

  const swithcToEnglish = () => {
    if (currentLang === "tr") {
      dispatch(switchLang("en"));
    }
  };

  const swithcToArabic = () => {
    if (currentLang === "en") {
      dispatch(switchLang("tr"));
    }
  };

  const handleLogout = async () => {
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
    await clearAllLoggedData()
    dispatch(setUserData({}));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginStack" }],
      })
    );
  };

  const listData = [
    { id: 1, title: I18n.t("h32"), type: "about_us" },
    { id: 2, title: I18n.t("h33"), type: "terms_&_conditions" },
    { id: 3, title: I18n.t("h34"), type: "privacy_policy" },
    { id: 4, title: I18n.t("h35"), type: "Publish_property" },
  ];

  const listView = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setShowListView(false);
        navigation.navigate("AboutUs", {
          header: item.title,
          content_type: item.type,
        });
      }}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: colors.black,
        borderBottomWidth: index === listData.length - 1 ? 0 : 1,
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: fontSize["3"],
          fontWeight: fontWeight[600],
          color: colors.black,
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const List = () => (
    <Modal
      onModalHide={() => setShowListView(false)}
      onBackdropPress={() => setShowListView(false)}
      isVisible={showListView}
      animationOutTiming={500}
      backdropOpacity={0.76}
      style={{ alignItems: "center" }}
    >
      <View
        style={{
          width: screenWidth * 0.8,
          backgroundColor: colors.white,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <FlatList
          data={listData}
          inverted={I18nManager.isRTL}
          renderItem={listView}
          keyExtractor={(item, index) => index + "item"}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );

  return (
    <>
      <View style={styles.container}>
        <Header
          title={I18n.t("Profile")}
          height={80}
          // marginTop={screenWidth * 0.03}
          // paddingVertical={screenWidth * 0.08}
          paddingHorizontal={screenWidth * 0.02}
          // showLeftIcon={true}
          showRightIcon={true}
          showTitleInCenter={true}
          leftIconSource={icons["arrow-left"]}
          rightIconSource={icons["menu"]}
          tintColor={"#000000"}
          onBackPress={() => navigation.goBack()}
          onRightPress={() => setShowListView(true)}
          backgroundColor={colors.primary}
        />

        <View style={{ margin: screenWidth * 0.1 }}>
          {/* <Text style={[styles.headerStyle]}>
            {I18n.t("Name*")}:{" "}
            <Text style={[styles.verbiageStyle]}>
              {User?.name ? User?.name : I18n.t("Guest")}
            </Text>
          </Text> */}
          <Text style={[styles.headerStyle]}>
            {I18n.t("Login Id")}:{" "}
            <Text style={[styles.verbiageStyle]}>
              {User?.phoneNumber ? User?.phoneNumber : I18n.t("Guest")}
            </Text>
          </Text>
          {/* <Text style={[styles.headerStyle]}>{I18n.t('Phone Number')}:  <Text style={[styles.verbiageStyle]}>{'+92 303 4651668'}</Text></Text> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: screenWidth * 0.1,
          }}
        >
          <TouchableOpacity
            onPress={() => swithcToEnglish()}
            style={{
              width: screenHeight * 0.1,
              backgroundColor:
                currentLang === "en" ? colors.primary : colors.secondary,
              height: screenHeight * 0.04,
              justifyContent: "center",
              borderTopLeftRadius: screenHeight * 0.1,
              borderBottomLeftRadius: screenHeight * 0.1,
              borderWidth: 0.5,
              borderColor: colors.white,
            }}
          >
            <Text
              style={[
                styles.topTab,
                {
                  alignSelf: "center",
                  color:
                    currentLang === "en"
                      ? colors.white
                      : colors.placeholderTextColor,
                },
              ]}
            >
              {I18n.t("English")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swithcToArabic()}
            style={{
              width: screenHeight * 0.1,
              backgroundColor:
                currentLang === "tr" ? colors.primary : colors.secondary,
              height: screenHeight * 0.04,
              justifyContent: "center",
              borderTopRightRadius: screenHeight * 0.1,
              borderBottomRightRadius: screenHeight * 0.1,
              borderWidth: 0.5,
              borderColor: colors.white,
            }}
          >
            <Text
              style={[
                styles.topTab,
                {
                  alignSelf: "center",
                  color:
                    currentLang === "tr"
                      ? colors.white
                      : colors.placeholderTextColor,
                },
              ]}
            >
              {I18n.t("Turkish")}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => handleLogout()}
        >
          <Text style={[styles.logoutTextStyle, { justifyContent: "center" }]}>
            {Object.keys(User || {})?.length > 0
              ? I18n?.t("Logout")
              : I18n?.t("Create Account")}
          </Text>
        </TouchableOpacity>
        {/* {loading && <ActivityIndicator />} */}
      </View>
      <List />
    </>
  );
};
//
export default Profile;
