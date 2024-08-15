import { I18nManager, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  fontWeight,
  screenHeight,
  screenWidth,
} from "../../assets";

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      height: screenHeight,
      width: screenWidth,
      backgroundColor: colors.white,
    },

    filtersBackground: {
      width: screenWidth,
      height: screenHeight * 0.275,
      // transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    propertyImageStyle: {
      marginTop: screenHeight * 0.015,
      width: screenWidth * 0.9,
      height: screenHeight * 0.2,
    },
    propertySubImageStyle: {
      width: screenWidth * 0.28,
      height: screenHeight * 0.1,
    },
    heartIconStyle: {
      alignSelf: "flex-end",
      width: screenWidth * 0.068,
      height: screenHeight * 0.032,
      top: 20,
      right: 10,
    },
    filterPlaceTiltleImage: {
      width: screenWidth * 0.55,
      height: screenHeight * 0.05,
      marginTop: screenHeight * 0.02,
    },
    arrowDown: {
      width: screenWidth * 0.02,
      height: screenHeight * 0.02,
    },
    propertyIconsStyle: {
      width: screenWidth * 0.06,
      height: screenHeight * 0.024,
    },
    filtersPlace: {
      width: screenWidth * 0.85,
      height: screenHeight * 0.162,
      marginTop: screenHeight * 0.02,
      borderRadius: screenHeight * 0.02,
      backgroundColor: colors.white,
      overflow: "hidden",
      // transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    title: {
      marginTop: screenHeight * 0.02,
      fontSize: fontSize[5],
      fontWeight: fontWeight[700],
      color: colors.white,
      width: screenWidth * 0.6,
      textAlign: "center",
    },
    buyFilter: {
      fontSize: fontSize["4"],
      fontWeight: fontWeight[400],
      color: colors.black,
      textAlign: "center",
    },
    rentFilter: {
      fontSize: fontSize["4"],
      fontWeight: fontWeight[400],
      color: colors.black,
      textAlign: "center",
    },
    titleBottom: {
      // width: screenWidth * 500 / 1000,
      marginTop: screenHeight * 0.015,
      fontSize: fontSize[4],
      fontWeight: fontWeight[400],
      color: colors.black,
      textAlign: "center",
    },
    tagViewStyle: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white,
      position: "absolute",
      zIndex: 100,
      width: screenWidth * 0.23,
      height: screenHeight * 0.04,
      borderTopRightRadius: screenHeight * 0.01,
      borderBottomRightRadius: screenHeight * 0.01,
      top: screenHeight * 0.04,
      opacity: 0.6,
    },
    tagTitleStyle: {
      fontSize: fontSize["4"],
      fontWeight: fontWeight[800],
      color: colors.black,
      textAlign: "center",
    },
    subTitleBottom: {
      // width: screenWidth * 500 / 1000,
      fontSize: fontSize["5"],
      fontWeight: fontWeight[600],
      color: colors.black,
      textAlign: "center",
    },
    subPropertyPriceStyle: {
      marginTop: screenHeight * 0.008,
      fontSize: fontSize["6"],
      fontWeight: fontWeight[600],
      color: colors.black,
      // textAlign:'left'
    },
    titleStyle: {
      fontSize: fontSize["5"],
      fontWeight: fontWeight[600],
      color: colors.black,
      marginTop: screenHeight * 0.015,
      marginBottom: screenHeight * 0.001,
    },
    avgRatingStyle: {
      fontSize: fontSize["4"],
      fontWeight: fontWeight[400],
      color: colors.primary,
      marginTop: screenHeight * 0.015,
      marginBottom: screenHeight * 0.001,
      alignSelf: "center",
    },
    subSubTitleStyle: {
      // width: screenWidth * 500 / 1000,
      fontSize: fontSize["3"],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    propertyDescriptionStyle: {
      fontSize: fontSize["3"],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    iconTitleStyle: {
      fontSize: fontSize["3"],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    iconValueStyle: {
      fontSize: fontSize["3"],
      fontWeight: fontWeight[600],
      color: colors.black,
    },
    propertyDescriptionStyle: {
      fontSize: fontSize["3"],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    contAsGuest: {
      fontSize: fontSize["3.5"],
      color: colors.black,
    },
    guest: {
      fontSize: fontSize["3.5"],
      fontWeight: fontWeight[500],
      color: colors.black,
    },
    Or: {
      fontSize: fontSize["3.5"],
      fontWeight: fontWeight[300],
      color: colors.black,
      marginVertical: screenHeight * 0.02,
    },
    searchPropertyText: {
      fontSize: fontSize["3.5"],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    // searchPropertyContainer: {
    //   marginTop: screenHeight * 0.02,
    //   width: screenWidth * 465 / 1000,
    //   height: screenHeight * 0.032,
    //   borderRadius: screenHeight * 25 / 1000,
    //   alignSelf: 'center',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: colors.primary

    // },
    showOnMap: {
      marginTop: screenHeight * 0.02,
      width: screenWidth * 0.3,
      height: 40,
      borderRadius: (screenHeight * 25) / 1000,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    InputContainer: {
      height: (screenHeight * 59) / 1000,
      width: (screenWidth * 800) / 1000,
      borderWidth: 1,
      borderColor: colors.textInputBorderColor,
      alignSelf: "center",
      alignItems: "center",
      borderRadius: (screenHeight * 25) / 1000,
      marginTop: (screenHeight * 28) / 1000,
      padding: (screenWidth * 25) / 1000,
      textAlign: I18nManager.isRTL ? "right" : "left",
    },
    buySellFilterContainer: {
      width: screenWidth * 0.13,
      height: screenHeight * 0.032,
      borderRadius: screenHeight * 0.01,
      borderColor: colors.borderColor,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    selectFilterStyle: {
      width: screenWidth * 0.3,
      height: screenHeight * 0.032,
      borderRadius: screenHeight * 0.01,
      borderColor: colors.borderColor,
      alignItems: "center",
      borderWidth: 1,
    },
    touchHearStyle: {
      position: "absolute",
      zIndex: 100,
      alignSelf: "flex-end",
      top: 20,
      right: 10,
    },
    backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    // Review Styles
    reviewContainer: {
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.grey6,
      padding: (screenWidth * 25) / 1000,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 15,
    },
    reviewDateView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    reviewNameStyle: {
      fontWeight: "600",
    },
    reviewDateStyle: {
      fontWeight: "500",
    },
    reviewStyle: {
      fontWeight: "500",
    },
  });
};

export default dynamicStyles;
