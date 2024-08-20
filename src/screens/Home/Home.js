import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  Linking,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dynamicStyles from "./styles";
import { useSelector } from "react-redux";
import I18n from "i18n-js";
import { Header } from "../../components/Header";
import {
  colors,
  fontSize,
  fontWeight,
  icons,
  images,
  screenHeight,
  screenWidth,
} from "../../assets";
import { baseUrl, routes } from "../../apis";
import axios from "axios";
import { upsertFavorites } from "../../core/onboarding/redux/favorites";
import Loading from "../../components/Loading";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";
import AdvanceFilters from "../../components/AdvanceFIlters";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLoggedInData } from "../../utils/storage";

const Home = () => {
  const state = useSelector((state) => state);
  let userData = async () => {
    const userData = await getLoggedInData();

    console.log('userData getLoggedInData', userData);
  }


  console.log("====== state at home ======", state);

  const currentLang = useSelector((state) => state.lang.defaultLang);
  const Favorites = useSelector((state) => state.fav.Favorites);

  const categoryTypes = [
    { id: 1, key: "category_type", title: "Houses" },
    { id: 3, key: "category_type", title: "Flats" },
  ];

  const locations = [
    { id: 1, key: "location_area", title: "Nicosia" },
    { id: 2, key: "location_area", title: "Famagusta" },
    { id: 3, key: "location_area", title: "Girne" },
  ];

  console.log("≠≠≠≠≠≠≠ Favorites ≠=≠≠≠≠≠≠", Favorites);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  const [currentCollection, setCurrentCollection] = useState("");

  const [Properties, setProperties] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterCollection, setFilterCollection] = useState([]);

  console.log("≠≠≠≠≠≠≠ Properties ≠=≠≠≠≠≠≠", Properties);

  const [toggle, setToggle] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showCategoryView, setShowCategoryView] = useState(false);

  const styles = dynamicStyles();

  useEffect(() => {
    userData()
    setToggle(!toggle);
  }, [currentLang]);

  useEffect(() => {
    console.log({ filters });
  }, [filters?.length]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProperties();
    });
    return unsubscribe;
  }, [navigation]);

  const getProperties = (qParams) => {
    try {
      setLoading(true);
      console.log("route", baseUrl + routes.read_properties + "?" + qParams);
      axios
        .get(baseUrl + routes.read_properties + "?" + qParams)
        .then((response) => {
          console.log("read-properties response:", response.data);
          // Handle a successful response
          setProperties(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Handle any errors
          if (error?.response) {
            // The request was made, but the server responded with a status code outside the 2xx range
            console.log("Response Error:", error.response.data);
          } else {
            // Something happened in setting up the request, and an error was thrown
            console.log("General Error:", error.message);
          }
        });
    } catch (error) {
      console.log("error while loading all properties");
    }
  };

  const getHandleCategoryData = (key, filterValue) => {
    let qP = `filter=${key}&filterValue=${filterValue}`;
    // console.log('qP',qP);
    setShowCategoryView(false);
    if (currentCollection === "Location") {
      setSelectedLocation(filterValue);
    } else if (currentCollection === "Category") {
      setSelectedCategory(filterValue);
    }
    getProperties(qP);
  };

  const handleApplyFilters = (qParams) => {
    console.log("handleApplyFilters parent", qParams);
    setShowCategoriesModal(false);
    setLoading(!loading);
    getProperties(qParams);
  };

  const handleAddToFavorites = (property) => {
    const indexOfFavorite = Favorites?.findIndex(
      (item) => item.id === property.id
    );

    let updatedFavs;

    if (indexOfFavorite >= 0) {
      updatedFavs = Favorites?.filter((item) => item.id !== property.id);
    } else {
      updatedFavs = [...(Favorites || []), property];
    }

    console.log("updatedFavs", updatedFavs);
    dispatch(upsertFavorites(updatedFavs));
  };

  const handleContact = (property) => {
    let url = "whatsapp://send?text=Hello&phone=" + property.contact_no;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };

  const handleFilters = (filter, type) => {
    const indexOfFilter = filters?.findIndex((item) => item === filter);

    if (indexOfFilter >= 0) {
      setFilters(filters?.filter((item) => item !== filter));
    } else {
      setFilters([...(filters || []), filter]);
    }
  };

  const getFilteredProperties = () => {
    return Properties.filter((item) => filters?.includes(item.listing_type));
  };

  const listHeaderComponent = () => (
    <>
      <ImageBackground
        style={[
          styles.filtersBackground,
          { alignItems: "center", opacity: 0.7 },
        ]}
        source={images["propertyImage"]}
      >
        {/* <Text style={styles.title}>{I18n.t('Buy or rent properties with no commission')}</Text> */}
        {/* <Image style={styles.filterPlaceTiltleImage} source={images.filterPlaceTiltleImage} /> */}
        <View style={styles.filterPlaceTiltleImage}></View>
        <ImageBackground
          style={[styles.filtersPlace]}
          source={images.filtersPlace}
        >
          {/* <Text style={[[styles.filtersTag,{alignSelf:'flex-end'}]]}>{I18n.t('Clear Filters')}</Text> */}

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => handleFilters("Buy")}
              style={[
                styles.buySellFilterContainer,
                {
                  backgroundColor: filters.includes("Buy")
                    ? colors.primary
                    : colors.white,
                },
              ]}
            >
              <Text style={[styles.buyFilter]}>{I18n.t("Buy")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFilters("Rent")}
              style={[
                styles.buySellFilterContainer,
                {
                  marginLeft: screenWidth * 0.05,
                  backgroundColor: filters.includes("Rent")
                    ? colors.primary
                    : colors.white,
                },
              ]}
            >
              <Text style={styles.rentFilter}>{I18n.t("Rent")}</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: screenHeight * 0.015, }}>
            <TouchableOpacity style={[styles.categoryFiltersStyle,]}>
              <Text style={[styles.buyFilter]}>{I18n.t('Houses')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryFiltersStyle, { marginLeft: screenWidth * 0.05, }]}>
              <Text style={styles.rentFilter}>{I18n.t('Apartments')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.categoryFiltersStyle, { marginLeft: screenWidth * 0.05, }]}>
              <Text style={styles.rentFilter}>{I18n.t('Flats')}</Text>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: screenHeight * 0.015,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurrentCollection("Category");
                setFilterCollection(categoryTypes);
                setShowCategoryView(true);
              }}
              style={[
                styles.selectFilterStyle,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.buyFilter, { marginLeft: screenWidth * 0.02 }]}
              >
                {I18n.t(selectedCategory)}
              </Text>
              <Image
                style={[styles.arrowDown, { marginRight: screenWidth * 0.02 }]}
                source={icons["arrow-down"]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCurrentCollection("Location");
                setFilterCollection(locations);
                setShowCategoryView(true);
              }}
              style={[
                styles.selectFilterStyle,
                {
                  marginLeft: screenWidth * 0.05,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text
                style={[styles.rentFilter, { marginLeft: screenWidth * 0.02 }]}
              >
                {selectedLocation}
              </Text>
              <Image
                style={[styles.arrowDown, { marginRight: screenWidth * 0.02 }]}
                source={icons["arrow-down"]}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.searchPropertyContainer}
            onPress={() => setShowCategoriesModal(true)}
          >
            <Text
              style={[styles.searchPropertyText, { justifyContent: "center" }]}
            >
              {I18n.t("Advance Filters")}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
      <Text style={[styles.titleBottom]}>
        {I18n.t("Our Choices of Popular")}
      </Text>
      <Text style={styles.subTitleBottom}>{I18n.t("Real Estate")}</Text>
    </>
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("PropertyDetails", item)}
      style={{ marginVertical: 7, elevation: 5,  backgroundColor: '#fff', borderRadius: screenHeight * 0.012 }}
    >
      <View
        style={{
          borderBottomColor: colors.black,
          borderBottomWidth: 1.5,
          paddingBottom: screenHeight * 0.008,
          // marginTop: screenHeight * 0.01,
        }}

      >
        {/* //marginBottom: (Properties.length - 1) === index ? screenHeight * 0.15 : 0 }}> */}
        <TouchableOpacity
          style={styles.touchHearStyle}
          onPress={() => handleAddToFavorites(item)}

        >
          <Image
            style={[styles.heartIconStyle]}
            source={
              Favorites?.findIndex((fav) => fav.id == item.id) < 0
                ? icons["heartEmptyColor"]
                : icons["heartColor"]
            }
          />
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

        {/* <TouchableOpacity style={{
          position: 'absolute',
          zIndex: 100, alignSelf: 'flex-end',
          right: 8,
          top: screenHeight * 0.16,
        }} onPress={() => handleAddToFavorites(item)}>
          <Image style={{
            tintColor:'red',
            width: screenWidth * 0.10,
            height: screenHeight * 0.04,
          }} source={icons['phone']} />
        </TouchableOpacity> */}

        <View style={styles.tagViewStyle}>
          <Text style={styles.tagTitleStyle}>
            {I18n.t(`For ${item.listing_type}`)}
          </Text>
        </View>
        <FastImage
          style={[
            styles.propertyImageStyle,
            { borderRadius: screenHeight * 0.012 },
          ]}
          source={{ uri: item.main_image }}
        />
        {/* // source={images['propertyImage']} /> */}
        {/* <Text style={[styles.subSubTitleStyle, { marginTop: screenHeight * 0.008 }]}>{item.title}</Text>
        <Text style={[styles.propertyTitleStyle, {}]}>{item.sub_title}</Text>
        <Text style={[styles.propertyDescriptionStyle, {}]}>{item.description}</Text> */}
        {/* <View style={{ flexDirection: 'row',width:screenWidth }}> */}
        <View style={{}}>
          <Text
            style={[
              styles.subSubTitleStyle,
              { marginTop: screenHeight * 0.008, paddingHorizontal:5 },
            ]}
          >
            {item.title}
          </Text>
          <Text style={[styles.propertyTitleStyle, {paddingHorizontal:5}]}>{item.sub_title}</Text>
          <Text style={[styles.propertyDescriptionStyle, {paddingHorizontal:5}]}>
            {item.description}
          </Text>
          {/* </View>
            <View style={{width: screenWidth*0.3}} >
              <Image style={[styles.propertyIconsStyle]} source={icons['bath']} />
            </View> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: screenWidth * 0.9,
          justifyContent: "space-between",
          padding:5
        }}
      >
        <Text style={[styles.subPropertyPriceStyle]}>{`${item.price} $`}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: screenWidth * 0.36,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={[
                styles.propertyIconsStyle,
                { bottom: screenHeight * 0.005 },
              ]}
              source={icons["bath"]}
            />
            <Text> {`${item.bath_count ? item.bath_count : 0}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={[
                styles.propertyIconsStyle,
                { bottom: screenHeight * 0.005 },
              ]}
              source={icons["bed"]}
            />
            <Text> {`${item.bed_room_count}`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={[
                styles.propertyIconsStyle,
                { bottom: screenHeight * 0.003 },
              ]}
              source={icons["house"]}
            />
            <Text> {`${item.size}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const ListFooterComponent = () => {
    <View style={{ height: 200, marginBottom: 200 }} />;
  };

  const listView = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => getHandleCategoryData(item.key, item.title)}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: fontSize["3"],
          fontWeight: fontWeight[600],
          color: colors.black,
        }}
      >
        {/* {I18n.t(item.title)} */}
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const AdvanceFiltersView = () => {
    return (
      <AdvanceFilters
        styles={styles}
        showCategoriesModal={showCategoriesModal}
        handleShowModal={() => setShowCategoriesModal(!showCategoriesModal)}
        handleApplyFilters={handleApplyFilters}
      />
    );
  };

  const CategoriesView = () => {
    return (
      <Modal
        animationIn="zoomInUp"
        animationOut="zoomInRight"
        onModalHide={() => setShowCategoryView(false)}
        onBackdropPress={() => setShowCategoryView(false)}
        isVisible={showCategoryView}
        // animationInTiming={700}
        // animationOutTiming={1000}
        backdropOpacity={0.2}
        style={{
          top: screenHeight * 0.225,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={[styles.showCategoryView]}>
          <FlatList
            data={filterCollection}
            inverted={I18nManager.isRTL}
            renderItem={listView}
            keyExtractor={(item, index) => index + "item"}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent />
        <Header
          title={"User Guides"}
          heights={screenHeight * 0.13}
          // width={screenWidth}
          // marginTop = {screenWidth * 0.02}
          // paddingHorizontal={screenWidth * 0.0}
          // showRightIcon = {true}
          showLeftIcon={false}
          showTitleInCenter={true}
          // leftIconSource={images['logo']}
          centerIconSource={icons["simplelogo"]}
          showIconInCenter={true}
          tintColor={"#ffffff"}
          // backgroundColor={'red'}
          // onBackPress={() => navigation.goBack()}
          backgroundColor={colors.primary}
        />
        <FlatList
          // ListFooterComponent={ListFooterComponent()}
          // ListFooterComponentStyle={{,marginBottom:100}}
          ListHeaderComponent={listHeaderComponent()}
          contentContainerStyle={{ alignItems: "center" }}
          data={filters?.length > 0 ? getFilteredProperties() : Properties}
          inverted={I18nManager.isRTL}
          renderItem={renderItem}
          keyExtractor={(item, index) => index + "item"}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={getProperties}
        // onEndReached={onListEndReached}
        // onEndReachedThreshold={0.3}
        />
        <AdvanceFiltersView />
        <CategoriesView />

        {loading && <Loading />}
      </View>
    </>
  );
};
//
export default Home;
