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
import { useDispatch, useSelector } from 'react-redux';
import { colors, images, screenHeight, screenWidth } from '../../../assets'
import I18n from 'i18n-js'
import axios from 'axios'
import { baseUrl, routes } from '../../../apis'
import { setUserData } from '../../../core/onboarding/redux/auth'

const SetPassword = (props) => {
  console.log('otp screen params', props.route.params)

  let { phone_no, otp} = props.route.params
  const currentLang = useSelector(state => state.lang.defaultLang)
  const navigation = useNavigation()
  const styles = dynamicStyles()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [showReqError, setShowReqError] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(!toggle)
  }, [currentLang])

  const onPressUpdate = () => {
// 03123456789
// 12345678
    try {
      // const phoneRegex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/

      if (confirmPassword && password && password === confirmPassword) {
        showReqError && setShowReqError(false)

        const payload = {
          "phone_no": phone_no,
          "password": password,
        }

        setLoading(true)

        axios.post(baseUrl + routes.resetPassword, payload).then((response) => {
          console.log('login response:', response.data);
          setLoading(false)
          navigation.navigate('Login')

        }).catch((error) => {
          setLoading(false)
          // Handle errors
          if (error?.response) {
            console.log('Response Error:', error.response.data);
            Alert.alert('', error.response.data.error)
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

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View style={{ height: screenHeight, width: screenWidth, alignItems: 'center', backgroundColor: colors.white, paddingVertical: screenHeight * 0.08 }}>
        <Image style={styles.logo} source={images.logo} />

        <Text style={styles.title}>{I18n.t('Create Password')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={I18n.t('New Password')}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={I18n.t('Re-enter Password')}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
        {showReqError && <Text style={styles.reqFieldsErrorStyle}>{I18n.t('Please enter valid data')}*</Text>}
        
        {/* <TouchableOpacity style={{ marginTop: screenHeight * 0.02,
      marginRight: screenWidth * 0.12,
      alignSelf:'flex-end',}} onPress={()=> navigation.navigate('ForgotPassword')}>
          <Text style={[styles.reqForgotPasswordStyle, { color: 'black', textDecorationLine: 'underline' }]}>{I18n.t('Forgot Password')}?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.registerContainer, { justifyContent: 'center' }]}
          onPress={() => onPressUpdate()}>
          <Text style={styles.registerText}>{I18n.t('Update')}</Text>
        </TouchableOpacity>

        {/* <View style={{ flexDirection: 'row' }} >
          <Text style={styles.contAsGuest}>{I18n.t('Not a member')}</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
            <Text style={styles.guest}> ? {I18n.t('Register Here')} </Text>
          </TouchableOpacity>
        </View> */}

        {loading && <ActivityIndicator style={{ position: 'absolute', top: screenHeight * 0.44, left: screenWidth * 0.44 }} size={'large'} />}
      </View>
    </KeyboardAwareScrollView>

  )
}

export default SetPassword;
