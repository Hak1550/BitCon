import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Login, OTP, SetPassword, Signup } from '../screens'
import ForgotPassword from '../screens/Auth/Password/ForgotPassword'

const AuthStack = createStackNavigator()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Login">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}

        name="Signup"
        component={Signup}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name= {"OTP"}
        component={OTP}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
       <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="SetPassword"
        component={SetPassword}
      />
     {/*  <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      /> */}
    </AuthStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
})

export default AuthStackNavigator
