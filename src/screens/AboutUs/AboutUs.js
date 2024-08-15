import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
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

const AboutUs = (props) => {
  const navigation = useNavigation();
  const headerText = props.route.params.header;
  const ContentType = props.route.params.content_type;

  console.log("headerText", headerText);

  const handleContact = () => {
    const url = "whatsapp://send?text=Hello&phone=" + "+905338201527";
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };

  const about_us_view = () => (
    <>
      <Text style={[styles.headerStyle]}>{I18n.t("Beetkom")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p1")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h1")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p2")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h2")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h3")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p3")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h4")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p4")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h5")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p5")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h6")}</Text>
      <Text style={[styles.subHeaderStyle]}>{I18n.t("h7")}</Text>

      <Text style={styles.paragraph}>{I18n.t("p6")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h8")} </Text>
      <Text style={styles.paragraph}>{I18n.t("p7")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h9")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p8")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h10")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p9")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h11")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p10")}</Text>
    </>
  );

  const terms_conditions_view = () => (
    <>
      <Text style={styles.paragraph}>{I18n.t("p18")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h12")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p12")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h13")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p13")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h14")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p14")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h15")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p15")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h16")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p16")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h17")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p17")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h18")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p11")}</Text>
    </>
  );

  const privacy_policy_view = () => (
    <>
      <Text style={styles.paragraph}>{I18n.t("p19")}</Text>

      <Text style={styles.paragraph}>{I18n.t("p20")}</Text>

      <Text style={styles.paragraph}>{I18n.t("p21")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h19")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p22")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h20")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p23")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h21")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p24")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p25")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p26")}</Text>

      <Text style={styles.headerStyle}>{I18n.t("h22")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p27")}</Text>
      <Text style={[styles.paragraph, { marginLeft: screenWidth * 0.03 }]}>
        {I18n.t("p28")}
      </Text>
      <Text style={[styles.paragraph, { marginLeft: screenWidth * 0.03 }]}>
        {I18n.t("p29")}
      </Text>
      <Text style={[styles.paragraph, { marginLeft: screenWidth * 0.03 }]}>
        {I18n.t("p30")}
      </Text>
      <Text style={styles.paragraph}>{I18n.t("p31")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h23")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p32")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h24")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p33")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h25")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p34")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h26")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p35")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h27")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p36")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h28")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p37")}</Text>
    </>
  );

  const pub_property_view = () => (
    <>
      <Text style={styles.paragraph}>
        {I18n.t("beforeNumber")}
        <TouchableOpacity onPress={handleContact} style={{ marginBottom: -10 }}>
          <Text
            style={{
              direction: "ltr",
              color: "black",
              fontSize: 12,
              textDecorationLine: "underline",
            }}
          >
            &#8237; +905338201527{" "}
          </Text>
        </TouchableOpacity>
        {I18n.t("afterNumber")}
      </Text>
      <Text style={styles.paragraph}>{I18n.t("p39")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h29")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p40")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h30")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p41")}</Text>

      <Text style={[styles.headerStyle]}>{I18n.t("h31")}</Text>
      <Text style={styles.paragraph}>{I18n.t("p42")}</Text>
    </>
  );

  return (
    <>
      <View style={styles.container}>
        <Header
          title={headerText}
          // marginTop={screenWidth * 0.03}
          paddingHorizontal={screenWidth * 0.02}
          backgroundColor={colors.primary}
          paddingVertical={screenWidth * 0.03}
          showLeftIcon={true}
          showTitleInCenter={true}
          leftIconSource={icons["arrow-left"]}
          tintColor={"#000000"}
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.innerContainer}
          showsVerticalScrollIndicator={false}
        >
          {ContentType === "about_us"
            ? about_us_view()
            : ContentType === "terms_&_conditions"
            ? terms_conditions_view()
            : ContentType === "privacy_policy"
            ? privacy_policy_view()
            : ContentType === "Publish_property"
            ? pub_property_view()
            : null}
        </ScrollView>
      </View>
    </>
  );
};
export default AboutUs;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.white,
  },
  headerStyle: {
    fontSize: fontSize["5"],
    fontWeight: fontWeight[600],
    color: colors.black,
  },
  subHeaderStyle: {
    fontSize: fontSize["3"],
    fontWeight: fontWeight[600],
    color: colors.black,
  },
  innerContainer: {
    alignSelf: "center",
    width: screenWidth * 0.9,
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.08,
  },
  paragraph: {
    fontSize: fontSize["3"],
    fontWeight: fontWeight[400],
    color: colors.black,
    alignItems: "center",
  },
});
