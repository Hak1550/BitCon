import { View, Image, Text, TouchableOpacity } from "react-native";
import { fontWeight, icons, screenHeight, screenWidth } from "../assets";
import I18n from "i18n-js";

export const Header = ({
  height,
  heights,
  width,
  paddingHorizontal,
  backgroundColor,
  showRightIcon,
  showLeftIcon,
  showTitleInCenter,
  title,
  leftIconSource,
  tintColor,
  rightIconSource,
  centerIconSource,
  onBackPress,
  showIconInCenter,
  marginTop,
  onRightPress,
  paddingVertical,
}) => {
  const leftIcon = {
    width: screenHeight * 0.042,
    height: screenHeight * 0.03,
    tintColor: tintColor ? tintColor : "#E0E0E0",
    // fontWeight: '900',
    alignSelf: "center",
    backgroundColor: backgroundColor,
  };
  const centerIcon = {
    marginVertical: screenHeight * 0.01,
    width: screenHeight * 0.06,
    height: screenHeight * 0.06,
    // backgroundColor:'red'
  };
  return !showTitleInCenter ? (
    <View
      style={{
        backgroundColor: backgroundColor,
        height: heights ? heights : 80,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", flex: 1 }}
        onPress={onBackPress}
      >
        {showLeftIcon && (
          <Image
            source={leftIconSource ? leftIconSource : icons["right-arrow"]}
            style={leftIcon}
          />
        )}
        <Text
          style={{
            color: "#222222",
            fontSize: (screenHeight * 20) / 1000,
            // fontSize: 28,
            alignSelf: "center",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
      {showRightIcon && (
        <TouchableOpacity onPress={() => console.log("hi")}>
          <Image
            source={rightIconSource ? rightIconSource : icons["right-arrow"]}
            style={leftIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <View
      style={{
        height: heights ? heights : 80,
        width: width,
        alignItems:'flex-end',
        flexDirection: "row",
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        padding:30,
        marginTop: marginTop,
        backgroundColor: backgroundColor,
        paddingBottom:0
      }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={onBackPress}
      >
        {showLeftIcon && (
          <Image
            source={leftIconSource ? leftIconSource : icons["right-arrow"]}
            style={[
              leftIcon,
              {
                tintColor: tintColor ? tintColor : "#E0E0E0",
              },
            ]}
          />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {showIconInCenter ? (
          <View style={{ flexDirection: "row" }}>
            <Image source={centerIconSource} style={centerIcon} />
            <Text
              style={{
                color: "#222222",
                fontSize: (screenHeight * 20) / 1000,
                alignSelf: "center",
                alignContent: "center",
                marginTop: screenHeight * 0.02,
                fontWeight: fontWeight[600],
              }}
            >
              {I18n.t("Beetkom")}
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color: "#222222",
              fontSize: (screenHeight * 25) / 1000,
              alignSelf: "center",
              alignContent: "center",
            }}
          >
            {title}
          </Text>
        )}
      </View>
      {showRightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          <Image
            source={rightIconSource ? rightIconSource : icons["right-arrow"]}
            style={[
              leftIcon,
              {
                tintColor: tintColor ? tintColor : "#E0E0E0",
                alignSelf: "center",
              },
            ]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
