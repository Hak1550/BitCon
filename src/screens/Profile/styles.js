import { I18nManager, StyleSheet } from 'react-native'
import { colors, fontSize, fontWeight, screenHeight, screenWidth } from '../../assets'

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      height: screenHeight, width: screenWidth, backgroundColor: colors.white,

    },
    headerStyle: {
      fontSize: fontSize['5'],
      fontWeight: fontWeight[600],
      color: colors.black,
    },
    verbiageStyle: {
      fontSize: fontSize['4'],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    topTab: { color: colors.white, fontWeight: "bold", fontSize: 16 },
    logoutTextStyle: {
      fontSize: fontSize['3.5'],
      fontWeight: fontWeight[400],
      color: colors.black,
    },
    logoutContainer: {
      position:'absolute',
      bottom:screenHeight*0.15,
      // marginTop: screenHeight * 0.02,
      width: screenWidth * 465 / 1000,
      height: screenHeight * 0.032,
      borderRadius: screenHeight * 25 / 1000,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary

    },
  })
}

export default dynamicStyles
