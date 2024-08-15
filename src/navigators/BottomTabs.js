import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, icons, screenHeight } from "../assets";
import { Image } from "react-native";
import { Favorites, Home, Profile } from "../screens";
import I18n from 'i18n-js'
import { useSelector } from "react-redux";
import MainStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
    backgroundColor: colors.secondary,
    height: screenHeight * 83 / 1000,
    // height: screenHeight * 0.06,

    borderTopLeftRadius: screenHeight * 0.03,
    borderTopRightRadius: screenHeight * 0.03,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
}

export default function BottomTabs(props) {
    const currentLang = useSelector(state => state.lang.defaultLang)
    const [toggle, setToggle] = React.useState(false)

    React.useEffect(() => {
        setToggle(!toggle)
    }, [currentLang])

    return (
        <>
            <Tab.Navigator
                initialRouteName="Properties"
                screenOptions={({ route }) => ({
                    tabBarStyle: tabBarStyle,
                    tabBarLabelStyle: { fontSize: screenHeight * 0.015, color: colors.black, fontWeight: '400', },
                    tabBarHideOnKeyboard: true,
                    // tabBarActiveTintColor: '#ffffff',
                    // tabBarInactiveTintColor: "grey",
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Properties') {
                            iconName = 'home';
                        } else if (route.name === 'Favorite') {
                            iconName = 'heart';
                        } else if (route.name === 'Profile') {
                            iconName = 'user';
                        }
                        // console.log('iconName', iconName + 'Focused')
                        return <Image
                            source={focused ? icons[iconName + 'Focused'] : icons[iconName]}
                            style={{
                                height:screenHeight * 0.036, //focused ? (screenHeight * 57) / 1000 : (screenHeight * 50) / 1000,
                                width:screenHeight * 0.036, //focused ? (screenHeight * 57) / 1000 : (screenHeight * 50) / 1000,,
                                // tintColor: '#000000'
                            }} />
                    },
                })}
            >

                <Tab.Screen
                    name={'Favorite'}
                    component={Favorites}
                    options={{ title: I18n.t("Favorites"), }}
                />

                <Tab.Screen
                    name={'Properties'}
                    component={MainStackNavigator}
                    options={{ title: I18n.t("Home") }}
                />

                <Tab.Screen
                    name={'Profile'}
                    component={ProfileStackNavigator}
                    options={{ title: I18n.t("Profile") }}
                />

            </Tab.Navigator>
        </>
    );
}
