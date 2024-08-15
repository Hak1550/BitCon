import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Favorites, Home, Profile, PropertyDetails } from '../screens'
import { useSelector } from 'react-redux'

const MainStack = createStackNavigator()
const MainStackNavigator = () => {
  const currentLang = useSelector(state => state.lang.defaultLang)
  const [toggle, setToggle] = React.useState(false)

  React.useEffect(() => {
    setToggle(!toggle)
  }, [currentLang])

  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
        // headerBackTitle: ('Back'),
      }}
      initialRouteName="Home">
      <MainStack.Screen name={"Home"} component={Home} options={{ headerShown: false }} />
      <MainStack.Screen name={"PropertyDetails"} component={PropertyDetails} options={{ headerShown: false }} />
    </MainStack.Navigator>
  )
}

export default MainStackNavigator
