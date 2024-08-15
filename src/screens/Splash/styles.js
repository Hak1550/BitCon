import { StyleSheet, StatusBar } from 'react-native'
import { colors, screenHeight, screenWidth } from '../../assets'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    buttonImage: {
      width: (screenHeight * 28) / 1000,
      height: (screenHeight * 28) / 1000,
      tintColor: '#E0E0E0',
      // fontWeight:'900',

    },
    item: {
      width: screenWidth,
      height:(screenHeight * 75) / 1000,
      padding: (screenHeight * 22) / 1000,
      borderBottomWidth: 0.7,  // Add a border line at the bottom
      borderBottomColor: '#ccc', // Border color,
      alignItems:'center',
      justifyContent:'center',
      alignContent:'space-around'
    },
    // visit_our_site:{

    // },
    visit_our_site: {
      width: (screenWidth * 0.9),
      height: (screenHeight * 60) / 1000,
      borderRadius: 100,
      backgroundColor: '#E0E0E0',
      marginTop: screenHeight * 0.08

    },
  })
}

export default dynamicStyles
