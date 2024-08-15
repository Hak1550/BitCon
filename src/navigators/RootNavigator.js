import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LoginStack from './AuthStackNavigator'
import BottomTabs from './BottomTabs'
import { Splash } from '../screens'

const Root = createStackNavigator()
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="Splash">
      {/* <Root.Screen name="LoadScreen" component={LoadScreen} /> */}
      {/*  <Root.Screen name="Walkthrough" component={WalkthroughScreen} /> */}
      {/* <Root.Screen name="MainStack" component={HomeStackNavigator} /> */}
      <Root.Screen name="Splash" component={Splash} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name={"BottomStack"} component={BottomTabs} />
    </Root.Navigator>
  )
}

export default RootNavigator
