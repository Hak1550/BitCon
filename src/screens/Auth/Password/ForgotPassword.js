// import React, { useState } from 'react'
// import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import {
//   useTheme,
//   useTranslations,
//   ActivityIndicator,
//   Alert,
// } from '../../../dopebase'
// import dynamicStyles from './styles'
// import { useAuth } from '../../hooks/useAuth'
// import { localizedErrorMessage } from '../../api/ErrorCode'

// const ResetPassword = props => {
//   const authManager = useAuth()
// console.log('check --------')
//   const { localized } = useTranslations()
//   const { theme, appearance } = useTheme()
//   const styles = dynamicStyles(theme, appearance)

//   const [email, setEmail] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const onSendPasswordResetEmail = () => {
//     const re =
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     const isValidEmail = re.test(email?.trim())

//     if (isValidEmail) {
//       setIsLoading(true)
//       authManager.sendPasswordResetEmail(email.trim()).then(response => {
//         setIsLoading(false)

//         if (response.error) {
//           return Alert.alert(
//             '',
//             localizedErrorMessage(response.error, localized),
//             [{ text: localized('OK') }],
//             {
//               cancelable: false,
//             },
//           )
//         }

//         Alert.alert(
//           localized('Link sent successfully'),
//           localized(
//             'Kindly check your email and follow the link to reset your password.',
//           ),
//           [
//             {
//               text: localized('OK'),
//               onPress: () => props.navigation.goBack(),
//             },
//           ],
//           { cancelable: false },
//         )
//       })
//     } else {
//       Alert.alert(
//         localized('Invalid email'),
//         localized('The email entered is invalid. Please try again'),
//         [{ text: localized('OK') }],
//         { cancelable: false },
//       )
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <KeyboardAwareScrollView
//         style={{ flex: 1, width: '100%' }}
//         keyboardShouldPersistTaps="always">
//         <TouchableOpacity onPress={() => props.navigation.goBack()}>
//           <Image style={styles.backArrowStyle} source={theme.icons.backArrow} />
//         </TouchableOpacity>
//         <Text style={styles.title}>{localized('Reset Password')}</Text>
//         <TextInput
//           style={styles.InputContainer}
//           placeholder={localized('E-mail')}
//           placeholderTextColor="#aaaaaa"
//           onChangeText={text => setEmail(text)}
//           value={email}
//           underlineColorAndroid="transparent"
//           autoCapitalize="none"
//         />
//         <TouchableOpacity
//           style={styles.sendContainer}
//           onPress={() => onSendPasswordResetEmail()}>
//           <Text style={styles.sendText}>{localized('Send')}</Text>
//         </TouchableOpacity>
//       </KeyboardAwareScrollView>
//       {isLoading && <ActivityIndicator />}
//     </View>
//   )
// }

// export default ResetPassword

import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/core'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dynamicStyles from './styles'
import { useSelector } from 'react-redux';
import { colors, images, screenHeight, screenWidth } from '../../../assets'
import I18n from 'i18n-js'
import axios from 'axios'
import { baseUrl, routes } from '../../../apis'
import PhoneInput from "react-native-phone-number-input";

const ForgotPassword = () => {
  const currentLang = useSelector(state => state.lang.defaultLang)
  const navigation = useNavigation()
  const styles = dynamicStyles()

  const [phoneNo, setPhoneNo] = useState('')
  const [password, setPassword] = useState()

  const [loading, setLoading] = useState(false)
  const [showReqError, setShowReqError] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(!toggle)
  }, [currentLang])

  const send = () => {
    try {
      // const phoneRegex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
      
      if (phoneNo) {
        showReqError && setShowReqError(false)

        const payload = {
          "phone_no": phoneNo,
        }

        console.log('payload for login', payload)

        setLoading(true)
        axios.post(baseUrl + routes.forgotPassword, payload).then((response) => {
          console.log('forgot pass response:', response.data);
          setLoading(false)

          navigation.navigate('OTP', { navigationType: 'resgistration', payload })

        }).catch((error) => {
          // console.log('error while forgot pass send clicked', error)
          setLoading(false)
          // Handle errors
          if (error?.response) {
            console.log('Response Error:', error.response.data);
            Alert.alert('', error.response.data.error ? error.response.data.error : error.response.data.msg)
          } else {
            console.log('General Error:', error.message);
          }
        });
      } else {
        setShowReqError(true)
      }
    } catch (error) {
      console.log('try catch error while login', error)
    }

  }

  const handleAsGuest = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'BottomStack' }],
      })
    );
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={{ height: screenHeight, width: screenWidth, alignItems: 'center', backgroundColor: colors.white, paddingVertical: screenHeight * 0.08 }}>
        <Image style={styles.logo} source={images.logo} />

        <Text style={styles.title}>{I18n.t('Forgot Password')}</Text>
        {/* <TextInput
          style={styles.InputContainer}
          placeholder={I18n.t('Phone Number')}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={text => setPhoneNo(text)}
          value={phoneNo}
        /> */}

        <View style={{
          width: (screenWidth * 800) / 1000,
          marginTop: screenHeight * 0.02,
        }}>
          <PhoneInput
            placeholder={I18n.t('Phone Number')}
            containerStyle={{ borderRadius: (screenHeight * 25) / 1000, borderWidth: 1, borderColor: colors.textInputBorderColor }}
            textContainerStyle={{ alignItems: 'center', height: screenHeight * 0.06, paddingVertical: screenHeight * 0.002, borderTopRightRadius: (screenHeight * 25) / 1000, borderBottomEndRadius: (screenHeight * 25) / 1000 }}
            defaultValue={phoneNo}
            defaultCode="JO"
            layout="first"
            onChangeFormattedText={(text) => {
              // console.log('onChangeFormattedText', text, text.length)
              // if(text.length<=9){
              // console.log('inside');

              setPhoneNo(text);
              // }
            }}
          />
        </View>

        {showReqError && <Text style={styles.reqFieldsErrorStyle}>{I18n.t('Please enter valid data')}*</Text>}

        <TouchableOpacity
          style={[styles.registerContainer, { justifyContent: 'center' }]}
          onPress={() => send()}>
          <Text style={styles.registerText}>{I18n.t('Send')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.guest}>{I18n.t('Login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleAsGuest()}>
          <Text style={styles.contAsGuest}>{I18n.t('Continue as a')}
            <Text style={styles.guest}>{I18n.t('Guest')}</Text>
          </Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator style={{ position: 'absolute', top: screenHeight * 0.44, left: screenWidth * 0.44 }} size={'large'} />}
      </View>
    </KeyboardAwareScrollView>

  )
}

export default ForgotPassword;
