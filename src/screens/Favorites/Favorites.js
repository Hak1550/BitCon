import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useDispatch } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dynamicStyles from './styles'
import { useSelector } from 'react-redux';
import I18n from 'i18n-js'
import { Header } from '../../components/Header'
import { colors, icons, images, screenHeight, screenWidth } from '../../assets'
import { upsertFavorites } from '../../core/onboarding/redux/favorites'

const Favorites = () => {
  const currentLang = useSelector(state => state.lang.defaultLang)
  const FavoritesColelction = useSelector(state => state.fav.Favorites)

  console.log('FavoritesColelction', FavoritesColelction)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(false)

  const styles = dynamicStyles()

  useEffect(() => {
    setToggle(!toggle)
  }, [currentLang])

  const onPressLogin = () => {

  }

  const data = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '3', name: 'Item 3' },
    { id: '3', name: 'Item 3' },
    { id: '3', name: 'Item 3' },
    { id: '3', name: 'Item 3' },
    { id: '3', name: 'Item 3' },

  ];

  const handleAddToFavorites = (property) => {
    const indexOfFavorite = FavoritesColelction?.findIndex((item) => item.id === property.id);

    let updatedFavs;

    if (indexOfFavorite >= 0) {
      updatedFavs = FavoritesColelction?.filter((item) => item.id !== property.id);
    } else {
      updatedFavs = [...(FavoritesColelction || []), property];
    }

    console.log('updatedFavs', updatedFavs);
    dispatch(upsertFavorites(updatedFavs));
  };

  const handleContact = (property)=>{
    let url = 'whatsapp://send?text=Hello&phone=' + property.contact_no;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  }

  const renderItem = ({ item }) => (
    <>
      <View style={{ borderBottomColor: colors.black, borderBottomWidth: 1.5, paddingBottom: screenHeight * 0.008 }}>
        {/* <Image style={[styles.heartIconStyle, { position: 'absolute', zIndex: 100 }]} source={icons['heartEmpty']} /> */}
        <TouchableOpacity style={styles.touchHearStyle} onPress={() => handleAddToFavorites(item)}>
          <Image style={[styles.heartIconStyle,]} source={FavoritesColelction?.findIndex((fav) => fav.id === item.id) < 0 ? icons['heartEmpty'] : icons['heart']} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{
          position: 'absolute',
          zIndex: 100, alignSelf: 'flex-end',
          right: 8,
          top: screenHeight * 0.16,
        }} onPress={() => handleContact(item)}>
          <Image style={{
            width: screenWidth * 0.10,
            height: screenHeight * 0.04,
          }} source={icons['whatsapp']} />
        </TouchableOpacity> */}
        <View style={styles.tagViewStyle}>
          <Text style={styles.tagTitleStyle}>{I18n.t(`For ${item.listing_type}`)}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PropertyDetails', item)}>
          <Image style={[styles.propertyImageStyle, { borderRadius: screenHeight * 0.012, }]} source={{uri:item.main_image}} />
        </TouchableOpacity>
        {/* <Image style={[styles.propertyImageStyle, { borderRadius: screenHeight * 0.012, }]} source={images['propertyImage']} /> */}
        <Text style={[styles.subSubTitleStyle, { marginTop: screenHeight * 0.008 }]}>{item.title}</Text>

        <Text style={[styles.propertyTitleStyle, {}]}>{item.sub_title}</Text>
        <Text style={[styles.propertyDescriptionStyle, {}]}>{item.description}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: screenWidth * 0.9, justifyContent: 'space-between' }}>
        <Text style={[styles.subPropertyPriceStyle]}>{item.price} $</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: screenWidth * 0.36 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={[styles.propertyIconsStyle,{bottom:screenHeight*0.003}]} source={icons['bath']} />
            <Text>  {`${item.bath_count ? item.bath_count : 0}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={[styles.propertyIconsStyle,{bottom:screenHeight*0.003}]} source={icons['bed']} />
            <Text>  {`${item.bed_room_count}`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={[styles.propertyIconsStyle,{}]} source={icons['house']} />
            <Text>  {`${item.size}`}</Text>
          </View>
        </View>
      </View>
    </>
  )
  const ListFooterComponent = () => {
    <View style={{ height: 200, marginBottom: 200 }} />
  }
  return (
    <>
      <View style={styles.container}>
        <Header
          title={I18n.t('Favorites')}
          height={screenHeight * 0.09}
          backgroundColor = {colors.primary}
          paddingVertical={screenWidth * 0.03}
          paddingHorizontal={screenWidth * 0.02}
          showTitleInCenter={true}
          leftIconSource={icons['arrow-left']}
          tintColor={'#000000'}
          onBackPress={() => navigation.goBack()}
        />
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={FavoritesColelction}
          inverted={I18nManager.isRTL}
          renderItem={renderItem}
          keyExtractor={(item, index) => index + 'item'}
          showsVerticalScrollIndicator={false}
        />

        {/* {loading && <ActivityIndicator />} */}
      </View>
    </>

  )
}
//
export default Favorites
