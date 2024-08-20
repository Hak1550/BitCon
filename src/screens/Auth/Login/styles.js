import { I18nManager, StyleSheet, Platform } from 'react-native'
import { colors, fontSize, fontWeight, screenHeight, screenWidth } from '../../../assets'

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      height:screenHeight,
      width:screenWidth,
      backgroundColor: colors.white,
    },
 
    logo: {
      width: screenWidth * 0.4,
      height: screenHeight * 0.1,
      // transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    title: {
      marginTop: screenHeight * 0.04,
      fontSize: fontSize[6],
      fontWeight: fontWeight[500],
      color: colors.black,
      
    },
    contAsGuest: {
      marginTop: screenHeight * 0.04,
      fontSize: fontSize['3.5'],
      color: colors.black,

    },
    reqFieldsErrorStyle: {
      marginTop: screenHeight * 0.02,
      fontSize: fontSize['3.5'],
      color: colors.red,
      alignSelf:'flex-end',
      marginRight: screenWidth * 0.12,
    },
    reqForgotPasswordStyle:{
      fontSize: fontSize['3'],
      color: colors.red,
    },
    guest: {
      marginTop: screenHeight * 0.04,
      fontSize: fontSize['3.5'],
      fontWeight: fontWeight[500],
      color: colors.primary,

    }, 
    registerText: {
      fontSize: fontSize['3.5'],
      fontWeight: fontWeight[500],
      color: colors.black,
    },
    registerContainer: {
      marginTop: screenHeight * 0.04,
      width: screenWidth * 465 / 1000,
      height: screenHeight * 51 / 1000,
      borderRadius: screenHeight * 25 / 1000,
      padding: screenHeight * 10 / 1000,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary

    },
    InputContainer: {
      height: (screenHeight * 59) / 1000,
      width: (screenWidth * 800) / 1000,
      borderWidth: 1,
      borderColor: colors.textInputBorderColor,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: (screenHeight * 25) / 1000,
      marginTop: screenHeight * 28 / 1000,
      padding: screenWidth * 25 / 1000,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    otpDescription: {
      width: screenWidth * 500 / 1000,
      marginTop: screenHeight * 0.015,
      fontSize: fontSize[3],
      fontWeight: fontWeight[300],
      color: colors.black,
    },
    checkbox: {
      marginRight: 8,
      zIndex:1
    },
  })
}

export default dynamicStyles
