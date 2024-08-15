import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {  AboutUs, Profile,  } from '../screens'
import { useSelector } from 'react-redux'

const MainStack = createStackNavigator()
const ProfileStackNavigator = () => {
  const currentLang = useSelector(state => state.lang.defaultLang)
  const [toggle, setToggle] = React.useState(false)

  React.useEffect(() => {
    setToggle(!toggle)
  }, [currentLang])

  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
      initialRouteName="Profile">
      <MainStack.Screen name={"Profile"} component={Profile} options={{ headerShown: false }} />
      <MainStack.Screen name={"AboutUs"} component={AboutUs} options={{ headerShown: false }} />
    </MainStack.Navigator>
  )
}

export default ProfileStackNavigator;
