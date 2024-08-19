import React, { useEffect, useState } from "react";
import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
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
import Three60View from "../../components/Modal";
import { upsertFavorites } from "../../core/onboarding/redux/favorites";
import FastImage from "react-native-fast-image";
import { AirbnbRating, Rating } from "react-native-ratings";
import VideoPlayer from "react-native-video-player";
import Modal from "react-native-modal";
import ShowPropertyImageView from "../../components/ShowPropertyImageView";
import axios from "axios";
import { baseUrl, routes } from "../../apis";
import Loading from "../../components/Loading";
import { Button } from "../../core/dopebase";
import EditReviewModal from "../../components/EditReviewModal";

const PropertyDetails = (props) => {
  const Property = props.route.params;
  const currentLang = useSelector((state) => state.lang.defaultLang);
  const Favorites = useSelector((state) => state.fav.Favorites);
  const User = useSelector((state) => state?.auth?.user?.sign_up_req);

  console.log("Property.id : ", Property.id);
  console.log("====================================");
  console.log("User : ", User);
  console.log("====================================");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [check, setcheck] = useState(false);
  const [ratingPoint, setRatingPoint] = useState();
  const [show360View, setshow360View] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState({});
  const [defaultRating, setDefaultRating] = useState(0);
  const [AVGRating, setAVGRating] = useState(0);
  const [forceStopRating, setForceStopRating] = useState(false);
  const [feedback, setFeedback] = useState();
  const [showpropertyVideo, setShowPropertyVideo] = useState(false);
  const [showPropertySubImage, setShowPropertySubImage] = useState(false);
  const [latestReviews, setLatestReviews] = useState();
  const [editableItem, setEditableItem] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);

  const isCurrentUserReviewed = latestReviews?.some(
    (review) => review.user_id === User?.email
  );

  // console.log("latestReviews : ", latestReviews,User);

  // console.log("RatingPoint : ", ratingPoint);

  // console.log("====================================");
  // console.log(
  //   "Latest Reviews : ",
  //   JSON.stringify(latestReviews?.data, null, 2)
  // );
  // console.log("====================================");

  const [toggle, setToggle] = useState(false);
  const styles = dynamicStyles();

  const getPropertyRating = async () => {
    await axios
      .get(baseUrl + routes.getAllRatings + "?property_id=" + Property.id)
      .then((response) => {
        console.log("GetRating : ", response.data.data.rating);
        setLatestReviews(response?.data?.data.reverse());
        setDefaultRating(response.data.data.rating);
        if (response.data.data.rating) {
          console.log("GetRating : ", response.data.data.rating);
          setForceStopRating(true);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error 1 : ", error);
        // Handle errors
        if (error?.response) {
          console.log("Response Error:", error.response.data);
          // Alert.alert('', error.response.data.error)
        } else {
          console.log("General Error:2", error.message);
        }
      });
  };

  const handleDeleteReview = async (id) => {
    const payload = {
      id: id,
      user_id: User?.email,
    };
    console.log("Payload : ", payload);
    setLoading(true);
    await axios
      .delete(baseUrl + routes.deleteRating, { data: payload })
      .then((response) => {
        getPropertyRating();
        getPropertyAVGRating();
        setRatingPoint(null);
        setForceStopRating(false);
      })
      .catch((error) => {
        setLoading(false);
        // Handle errors
        if (error?.response) {
          console.log("Response Error:", error.response.data);
          // Alert.alert('', error.response.data.error)
        } else {
          console.log("General Error:1", error.message);
        }
      });
  };

  const getPropertyAVGRating = async () => {
    await axios
      .get(baseUrl + routes.getAvgRating + "?id=" + Property.id)
      .then((response) => {
        setAVGRating(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // Handle errors
        if (error?.response) {
          console.log("Response Error:", error.response.data);
          // Alert.alert('', error.response.data.error)
        } else {
          console.log("General Error:3", error.message);
        }
      });
  };

  const formatDateString = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);

    // Extract day, month, and year parts
    const [month, day, year] = formattedDate.split(" ");

    // Reformat as "DD Mon YYYY"
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    setImageUrl({
      current: Property?.sub_image_1,
      collection: [Property?.sub_image_1, Property?.sub_image_2],
    });

    getPropertyRating();
    console.log("USERID => ", User?.email);
    getPropertyAVGRating();
  }, []);

  // const show360ViewHandler = ()=>{
  //   setshow360View(!show360View)
  // }

  const showPropertySubImageHanlder = () => {
    setShowPropertySubImage(false);
  };

  useEffect(() => {
    setToggle(!toggle);
  }, [currentLang]);

  const onPressLogin = () => { };
  const data = [{ id: "1", name: "Item 1" }];

  const propertyDetails = [
    {
      id: 1,
      iconName: "home",
      title: I18n.t("Size"),
      value: `${Property.size}`,
    },
    {
      id: 2,
      iconName: "bed",
      title: I18n.t("Bedrooms"),
      value: Property.bed_room_count,
    },
    {
      id: 3,
      iconName: "toiletRoom",
      title: I18n.t("Bathrooms"),
      value: Property.bath_count ? Property.bath_count : 0,
    },
    {
      id: 9,
      iconName: "calendar",
      title: I18n.t("Const Year"),
      value: Property.construction_year,
    },
    {
      id: 5,
      iconName: "house",
      title: I18n.t("Additional Space"),
      value: Property.additional_space_type,
    },
    {
      id: 7,
      iconName: "paintBrush",
      title: I18n.t("Renovation"),
      value: Property.revolution_date,
    },
    {
      id: 8,
      iconName: "ceiling",
      title: I18n.t("Ceiling Height"),
      value: Property.ceiling_height,
    },
    {
      id: 4,
      iconName: "floor",
      title: I18n.t("Floor"),
      value: Property.floor_type,
    },
    {
      id: 6,
      iconName: "furniture",
      title: I18n.t("Furnishing"),
      value: Property.furnished_type,
    },
  ];

  const propertUtility = [
    {
      id: 1,
      iconName: "heating",
      title: I18n.t("Heating"),
      value: Property.heating_type,
    },
    {
      id: 2,
      iconName: "openWindow",
      title: I18n.t("Window Type"),
      value: Property.window_type,
    },
    {
      id: 3,
      iconName: "centralAirConditioning",
      title: I18n.t("Air Condition"),
      value: Property.has_air_conditioners ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "tv",
      title: I18n.t("Cable TV"),
      value: Property.has_cable_tv ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "fireplace",
      title: I18n.t("Fireplace"),
      value: Property.has_fire_place ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "wi-fi",
      title: I18n.t("Wi-Fi"),
      value: Property.has_wifi ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "smcFanControlLogo",
      title: I18n.t("Ventilation"),
      value: Property.has_ventillation ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "intercom",
      title: I18n.t("Intercom"),
      value: Property.has_intercorm ? "Yes" : "No",
    },
  ];

  const OutdoorFeatures = [
    {
      id: 1,
      iconName: "garage",
      title: I18n.t("Garage"),
      value: Property.has_garage ? "Yes" : "No",
    },
    {
      id: 2,
      iconName: "parking",
      title: I18n.t("Parking"),
      value: Property.has_parking ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "garden",
      title: I18n.t("Garden"),
      value: Property.has_garden ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "handicapped",
      title: I18n.t("Barrier"),
      value: Property.disabled_access_type,
    },
    {
      id: 3,
      iconName: "swimmingPool",
      title: I18n.t("Swimming Pool"),
      value: Property.has_swimming_pool ? "Yes" : "No",
    },
    {
      id: 3,
      iconName: "fence",
      title: I18n.t("Fence"),
      value: Property.fence_type,
    },
    {
      id: 3,
      iconName: "security",
      title: I18n.t("Security"),
      value: Property.security_camaras_count,
    },
    {
      id: 3,
      iconName: "heartWithDogPaw",
      title: I18n.t("Pet Friendly"),
      value: Property.is_pet_friendly,
    },
  ];

  const WhatsNearby = [
    { id: 1, title: I18n.t("School"), value: `${Property.school_distance}` },
    {
      id: 2,
      title: I18n.t("Hospital"),
      value: `${Property.hospital_distance}`,
    },
    {
      id: 3,
      title: I18n.t("University"),
      value: `${Property.university_distance}`,
    },
    {
      id: 4,
      title: I18n.t("Metro Station"),
      value: `${Property.metro_station_distance}`,
    },
    {
      id: 5,
      title: I18n.t("Grocery Center"),
      value: `${Property.grocery_center_distance}`,
    },
    {
      id: 6,
      title: I18n.t("Wellness"),
      value: `${Property.wellness_distance}`,
    },
    { id: 6, title: I18n.t("Market"), value: `${Property.market_distance}` },
  ];

  const Reviews = [
    {
      id: "1",
      name: "umes334",
      date: "28 Sep 2023",
      review:
        "I've visited the place and it seemed a nice house, I wish the original owner have given me the real price",
      rating: 4,
    },
    {
      id: "2",
      name: "umes334",
      date: "28 Sep 2023",
      review:
        "I've visited the place and it seemed a nice house, I wish the original owner have given me the real price",
      rating: 4,
    },
  ];

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

    dispatch(upsertFavorites(updatedFavs));
  };

  const renderPropertyDetails = ({ item, index }) => (
    // <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
    <View
      style={{
        width: index % 2 !== 0 ? screenWidth * 0.423 : screenWidth * 0.423,
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
        borderBottomColor: "green",
        borderBottomWidth: 1,
        paddingVertical: screenWidth * 0.02,
        marginRight: screenWidth * 0.05,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            styles.propertyIconsStyle,
            { bottom: 2, marginRight: screenWidth * 0.01 },
          ]}
          source={icons[item.iconName]}
        />
        <Text style={[styles.iconTitleStyle, {}]}>{item.title}</Text>
      </View>
      <Text style={[styles.iconValueStyle, { color: "black" }]}>
        {item.value}
      </Text>
    </View>
  );

  const ShowVideoDisplay = () => (
    <Modal
      onModalHide={() => setShowPropertyVideo(false)}
      onBackdropPress={() => setShowPropertyVideo(false)}
      isVisible={showpropertyVideo}
      animationOutTiming={500}
      backdropOpacity={0.76}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      {/* <ActivityIndicator style={{position:'absolute',zIndex:100,justifyContent:'center'}} size={'large'} /> */}
      {/* 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' */}
      <View
        style={{
          height: screenHeight * 0.3,
          width: screenWidth * 0.9,
          backgroundColor: colors.white,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowPropertyVideo(false)}
          style={{
            position: "absolute",
            zIndex: 100,
            alignSelf: "flex-end",
            padding: screenHeight * 0.01,
          }}
        >
          <Image
            style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }}
            source={icons["cross"]}
          />
        </TouchableOpacity>
        <VideoPlayer
          style={{ borderRadius: 10 }}
          resizeMode="cover"
          disableControlsAutoHide={true}
          pauseOnPress={true}
          showDuration={true}
          video={{ uri: videoUrl }}
          videoWidth={screenWidth * 0.9}
          videoHeight={screenHeight * 0.3}
          thumbnail={{ uri: "https://youtu.be/qxOkaU6RVz4" }}
        />
      </View>
    </Modal>
  );

  const renderPropertUtility = ({ item, index }) => (
    <View
      style={{
        width: index % 2 !== 0 ? screenWidth * 0.423 : screenWidth * 0.423,
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
        borderBottomColor: "green",
        borderBottomWidth: 1,
        paddingVertical: screenWidth * 0.02,
        marginRight: screenWidth * 0.05,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            styles.propertyIconsStyle,
            { bottom: 2, marginRight: screenWidth * 0.01 },
          ]}
          source={icons[item.iconName]}
        />
        <Text style={[styles.iconTitleStyle, {}]}>{item.title}</Text>
      </View>
      <Text style={[styles.iconValueStyle, { color: "black" }]}>
        {item.value}
      </Text>
    </View>
  );

  const outdoorFeatures = ({ item, index }) => (
    <View
      style={{
        width: index % 2 !== 0 ? screenWidth * 0.423 : screenWidth * 0.423,
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
        borderBottomColor: "green",
        borderBottomWidth: 1,
        paddingVertical: screenWidth * 0.02,
        marginRight: screenWidth * 0.05,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[
            styles.propertyIconsStyle,
            { bottom: 2, marginRight: screenWidth * 0.01 },
          ]}
          source={icons[item.iconName]}
        />
        <Text style={[styles.iconTitleStyle, {}]}>{item.title}</Text>
      </View>
      <Text style={[styles.iconValueStyle, { color: "black" }]}>
        {item.value}
      </Text>
    </View>
  );

  const whatsNearby = ({ item, index }) => (
    <View
      style={{
        width: screenWidth * 0.45,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: screenHeight * 0.003,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          left: index % 2 !== 0 ? screenWidth * 0.05 : 0,
        }}
      >
        {/* <Image style={[styles.propertyIconsStyle, { marginRight: screenWidth * 0.01 }]} source={icons[item.iconName]} /> */}
        <Text style={[styles.iconTitleStyle, {}]}>{item.title}</Text>
      </View>
      <Text style={[styles.iconValueStyle, { color: "black" }]}>
        {item.value}
      </Text>
    </View>
  );

  const handleEditModal = (item) => {
    setEditableItem(item);
    setOpenEditModal(true);
  };

  const propertyReviews = ({ item, index }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewDateView}>
        <Text style={styles.reviewNameStyle}>
          {item?.user_name ? item?.user_name : "Anonymous"}
        </Text>
        <Text style={styles.reviewDateStyle}>
          {formatDateString(item?.created_on)}
        </Text>
      </View>
      <Text style={styles.reviewStyle}>{item?.feedback}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Rating
          readonly={true}
          // defaultRating={5}
          type="custom"
          ratingColor={colors.primary}
          imageSize={15}
          style={{ alignSelf: "flex-start", marginTop: 10 }}
          // tintColor={colors.primary}
          startingValue={item?.rating}
          // onSwipeRating={onSwipeRating}
          // onFinishRating={onFinishRating}
          // showRating
          ratingCount={5}
        // onStartRating= {onStartRating}
        />
        {User?.email === item.user_id && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => handleDeleteReview(item?.id)}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: colors.grey9,
                  marginRight: 10,
                }}
                source={require("../../assets/icons/delete.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditModal(item)}>
              <Image
                style={{ height: 20, width: 20, tintColor: colors.grey9 }}
              // source={require("../../assets/icons/edit.png")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const handleContact = (property, contType) => {
    console.log("property.contact_no", property.contact_no);
    if (contType === "call") {
      Linking.openURL(`tel:${property.contact_no}`);
    } else {
      let url = "whatsapp://send?text=Hello&phone=" + `${property.contact_no}`;
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          alert("Make sure Whatsapp installed on your device");
        });
    }
  };
  const onFinishRating = (rating) => {
    console.log("====================================");
    console.log("Rating In the function : ", rating);
    console.log("====================================");
    setRatingPoint(rating);
    if (!feedback) {
      setcheck(true);
    } else {
      setcheck(false);
    }
  };

  // console.log("Rating In the function : ",Property);
  const handlePostReview = async () => {
    if (ratingPoint && feedback) {
      const payload = {
        rating: ratingPoint,
        property_id: Property.id,
        user_id: User.id,
        feedback: feedback,
        user_name: User?.name,
      };
      setcheck(false);
      console.log("Payload : ", payload);
      setLoading(true);
      await axios
        .post(baseUrl + routes.postRating, payload)
        .then((response) => {
          getPropertyRating();
          getPropertyAVGRating();
          setLoading(false);
          setForceStopRating(true);
          setFeedback(null);
        })
        .catch((error) => {
          setLoading(false);
          // Handle errors
          if (error?.response) {
            console.log("Response Error:", error.response.data);
            // Alert.alert('', error.response.data.error)
          } else {
            console.log("General Error:1", error.message);
          }
        });
    } else {
      setcheck(true);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth * 0.9 }}>
      <Text style={[styles.titleStyle, { marginBottom: -5 }]}>{item?.title}</Text>

      <View style={{ marginTop: screenHeight * 0.01 }}>
        {/* <Image style={[styles.heartIconStyle, { position: 'absolute', zIndex: 100 }]} source={icons['heart']} /> */}
        <TouchableOpacity
          style={styles.touchHearStyle}
          onPress={() => handleAddToFavorites(item)}
        >
          <Image
            style={[styles.heartIconStyle]}
            source={
              Favorites?.findIndex((fav) => fav.id == item.id) < 0
                ? icons["heartEmpty"]
                : icons["heart"]
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
        <View style={styles.tagViewStyle}>
          <Text style={styles.tagTitleStyle}>
            {I18n.t(`For ${item.listing_type}`)}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {
          setImageUrl({
            current: item?.main_image,
            collection: [item?.sub_image_1, item?.sub_image_2],
          });
          setShowPropertySubImage(true);
        }}>
          <FastImage
            style={[
              styles.propertyImageStyle,
              { borderRadius: screenHeight * 0.012 },
            ]}
            source={{ uri: item.main_image }}
          />
        </TouchableOpacity>
        <Text
          style={[styles.subSubTitleStyle, { marginTop: screenHeight * 0.008 }]}
        >
          {item.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical:
            item.video_image_address || item?.sub_image_1 || item?.sub_image_2
              ? screenHeight * 0.02
              : 0,
        }}
      >
        {item.video_image_address && (
          <ImageBackground
            source={{ uri: item.main_image }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: screenWidth * 0.28,
              height: screenHeight * 0.1,
              borderRadius: screenHeight * 0.012, // Apply a border radius of 100
              overflow: "hidden", // Ensure
            }}
          >
            {/* 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' */}
            <TouchableOpacity
              onPress={() => {
                console.log("item url", item.video_image_address);
                console.log(
                  "static url",
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                );

                setVideoUrl(item.video_image_address);
                setShowPropertyVideo(true);
              }}
              style={{
                backgroundColor: "lightgrey",
                zIndex: 100,
                position: "absolute",
                borderRadius: screenHeight * 0.056,
              }}
            >
              <FastImage
                style={{
                  width: screenHeight * 0.064,
                  height: screenHeight * 0.064,
                }}
                source={icons.playVideo}
              />
            </TouchableOpacity>
          </ImageBackground>
        )}
        {item?.sub_image_1 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setImageUrl({
                current: item?.sub_image_1,
                collection: [item?.sub_image_1, item?.sub_image_2],
              });
              setShowPropertySubImage(true);
            }}
          >
            <FastImage
              style={[
                styles.propertySubImageStyle,
                { borderRadius: screenHeight * 0.012 },
              ]}
              source={{ uri: item?.sub_image_1 }}
            />
          </TouchableOpacity>
        )}
        {item?.sub_image_2 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setImageUrl({
                current: item?.sub_image_2,
                collection: [item?.sub_image_1, item?.sub_image_2],
              });
              setShowPropertySubImage(true);
            }}
          >
            <FastImage
              style={[
                styles.propertySubImageStyle,
                { borderRadius: screenHeight * 0.012 },
              ]}
              source={{ uri: item?.sub_image_2 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.titleStyle, {}]}>{I18n.t("Description")}</Text>
      <Text style={[styles.propertyDescriptionStyle, {}]}>
        {item.description}
      </Text>

      <Text style={[styles.titleStyle, {}]}>{I18n.t("Property Details")}</Text>
      <FlatList
        numColumns={2}
        data={propertyDetails}
        inverted={I18nManager.isRTL}
        renderItem={renderPropertyDetails}
        keyExtractor={(item, index) => index + "item"}
        showsVerticalScrollIndicator={false}
      />

      <Text style={[styles.titleStyle, {}]}>{I18n.t("Property Utility")}</Text>
      <FlatList
        numColumns={2}
        // contentContainerStyle={{ alignItems: 'center' ,backgroundColor:'red'}}
        data={propertUtility}
        inverted={I18nManager.isRTL}
        renderItem={renderPropertUtility}
        keyExtractor={(item, index) => index + "item"}
        showsVerticalScrollIndicator={false}
      />

      <Text style={[styles.titleStyle, {}]}>{I18n.t("Outdoor Features")}</Text>
      <FlatList
        numColumns={2}
        data={OutdoorFeatures}
        inverted={I18nManager.isRTL}
        renderItem={outdoorFeatures}
        keyExtractor={(item, index) => index + "item"}
        showsVerticalScrollIndicator={false}
      />

      <Text style={[styles.titleStyle, {}]}>{I18n.t("Floor Plan")}</Text>
      <View
        style={{
          paddingBottom: screenHeight * 0.008,
          marginTop: screenHeight * 0.01,
        }}
      >
        {/* <View style={styles.tagViewStyle}>
        </View> */}
        <TouchableOpacity activeOpacity={0.7} onPress={() => {
          setImageUrl({
            current: item?.first_floor_map_image,
            collection: [item?.first_floor_map_image],
          });
          setShowPropertySubImage(true);
          console.log("hi")
        }}>
          <FastImage
            style={[
              styles.propertyImageStyle,
              {
                borderRadius: screenHeight * 0.012,
                height: screenHeight * 0.258,
              },
            ]}
            source={{ uri: item.first_floor_map_image }}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.titleStyle, {}]}>{I18n.t("360 Tour")}</Text>

      <View
        style={{
          paddingBottom: screenHeight * 0.008,
          marginTop: screenHeight * 0.01,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            top: screenHeight * 0.03,
            right: screenWidth * 0.04,
            position: "absolute",
            zIndex: 200,
            width: screenWidth * 0.9,
            height: screenHeight * 0.034,
          }}
          onPress={() => setshow360View(!show360View)}
        >
          <Text
            style={{
              fontWeight: fontWeight[800],
              fontSize: fontSize[4],
              color: colors.black,
            }}
          >
            {I18n.t("Visit")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setshow360View(!show360View)}
        >
          <Image
            style={styles.propertyImageStyle}
            source={images["360BlurView"]}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.titleStyle, {}]}>{I18n.t("Location")}</Text>
      <View style={{ flexDirection: "row", width: screenWidth * 0.9 }}>
        <View style={{ width: screenWidth * 0.6 }}>
          <Text style={[styles.iconTitleStyle, { paddingRight: 20 }]}>
            {Property.address}
          </Text>
        </View>
        <View style={{ width: screenWidth * 0.3 }}>
          <TouchableOpacity
            style={[styles.showOnMap, {}]}
            onPress={() =>
              Property.map_url
                ? Linking.openURL(Property.map_url)
                : console.log("map show")
            }
          >
            <Text
              style={[styles.searchPropertyText, { justifyContent: "center" }]}
            >
              {I18n.t("Show on Map")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.titleStyle, {}]}>{I18n.t("What’s Nearby?")}</Text>
      {/* <Text style={[styles.iconTitleStyle, { width: screenWidth * 0.9 ,marginBottom:screenHeight*0.01 }]}>{'Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing'}</Text> */}

      <FlatList
        numColumns={2}
        data={WhatsNearby}
        inverted={I18nManager.isRTL}
        renderItem={whatsNearby}
        keyExtractor={(item, index) => index + "item"}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          marginVertical: screenHeight * 0.01,
          marginTop: screenHeight * 0.05,
        }}
      >
        <Text
          style={[styles.subPropertyPriceStyle, { width: screenWidth * 0.45 }]}
        >{`${Property.price}$`}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: screenWidth * 0.45,
            marginTop: screenHeight * 0.005,
          }}
        >
          <TouchableOpacity
            style={{ width: screenWidth * 0.12 }}
            onPress={() => handleContact(item, "call")}
          >
            <Image
              style={{
                width: screenWidth * 0.083,
                height: screenHeight * 0.043,
                tintColor: "grey",
              }}
              source={icons["phone"]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: screenWidth * 0.12 }}
            onPress={() => handleContact(item, "whatsapp")}
          >
            <Image
              style={{
                width: screenWidth * 0.1,
                height: screenHeight * 0.04,
              }}
              source={icons["whatsapp"]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: screenHeight * 0.002,
          backgroundColor: colors.black,
          marginTop: screenHeight * 0.012,
        }}
      />

      <>
        {/* <Text style={[styles.titleStyle, {}]}>{I18n.t('Rating')}</Text> */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.avgRatingStyle}>{I18n.t("Rating")}:</Text>
          <Text
            style={[
              styles.avgRatingStyle,
              {
                fontSize: fontSize["7"],
                fontWeight: fontWeight[500],
                marginTop: screenHeight * 0.015,
              },
            ]}
          >
            {AVGRating ? AVGRating : 0}
          </Text>
        </View>
        {!User?.email && (
          <Rating
            readonly={true}
            defaultRating={AVGRating ? AVGRating : 0}
            type="custom"
            ratingColor={colors.primary}
            imageSize={35}
            // tintColor={colors.primary}
            startingValue={AVGRating ? AVGRating : 0}
            // onSwipeRating={onSwipeRating}
            onFinishRating={onFinishRating}
            // showRating
            ratingCount={5}
          // onStartRating= {onStartRating}
          />
        )}
        {isCurrentUserReviewed && (
          <Rating
            readonly={true}
            // defaultRating={5}
            type="custom"
            ratingColor={colors.primary}
            imageSize={35}
            // tintColor={colors.primary}
            startingValue={AVGRating ? AVGRating : 0}
            // onSwipeRating={onSwipeRating}
            onFinishRating={onFinishRating}
            // showRating
            ratingCount={5}
          // onStartRating= {onStartRating}
          />
        )}
        {User?.email && !isCurrentUserReviewed && (
          <>
            <Rating
              readonly={forceStopRating}
              // defaultRating={5}
              type="custom"
              ratingColor={colors.primary}
              imageSize={35}
              // tintColor={colors.primary}
              startingValue={0}
              // onSwipeRating={onSwipeRating}
              onFinishRating={onFinishRating}
              // showRating
              ratingCount={5}
            // onStartRating= {onStartRating}
            />
            <Text style={[styles.titleStyle, {}]}>
              {I18n.t("Leave a Review")}
            </Text>
            <TextInput
              placeholderTextColor={colors.placeholderTextColor}
              multiline
              style={{
                borderWidth: 1,
                borderColor: colors.textInputBorderColor,
                borderRadius: 10,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                minHeight: 150,
                maxHeight: 150,
                marginTop: 10,
                textAlignVertical: "top",
              }}
              value={feedback}
              onChangeText={(text) => setFeedback(text)}
              placeholder={I18n.t("Your Review")}
            />
            {check && (
              <Text style={{ color: colors.red }}>
                {I18n.t("reviewValidation")}
              </Text>
            )}
            {!isCurrentUserReviewed && (
              <TouchableOpacity
                onPress={() => handlePostReview()}
                activeOpacity={0.7}
                style={{
                  backgroundColor: colors.primary,
                  alignSelf: "center",
                  padding: 7,
                  paddingLeft: 15,
                  paddingRight: 15,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  elevation: 5,
                  marginTop: 20,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: colors.black, fontWeight: "bold" }}>
                  {I18n.t("Post Review")}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </>
      <Text style={[styles.titleStyle, {}]}>{I18n.t("Latest Reviews")}</Text>
      {latestReviews ? (
        <FlatList
          style={{ marginTop: 10 }}
          data={latestReviews}
          keyExtractor={(item) => item?.id}
          renderItem={propertyReviews}
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            color: colors.grey6,
            marginTop: 20,
          }}
        >
          No Reviews Yet
        </Text>
      )}
      <EditReviewModal
        isVisible={openEditModal}
        editableItem={editableItem}
        setLoading={setLoading}
        handleShowModal={() => {
          setOpenEditModal(false);
          getPropertyRating();
          getPropertyAVGRating();
        }}
      />
      <View style={{ height: screenHeight * 0.19 }}></View>
    </View>
  );
  const ListFooterComponent = () => {
    <View style={{ height: 200, marginBottom: 200 }} />;
  };
  return (
    <>
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          alignItems: "center",
          backgroundColor: colors.white,
        }}
      >
        <Header
          title={I18n.t("Details")}
          // marginTop={screenWidth * 0.03}
          paddingHorizontal={screenWidth * 0.02}
          backgroundColor={colors.primary}
          paddingVertical={screenWidth * 0.03}
          showLeftIcon={true}
          showTitleInCenter={true}
          leftIconSource={icons["arrow-left"]}
          tintColor={"#000000"}
          onBackPress={() => navigation.goBack()}
        />
        <View
          style={{
            width: screenWidth * 0.9,
            borderBottomColor: "red",
            borderBottomWidth: 1,
          }}
        >
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={[Property]}
            inverted={I18nManager.isRTL}
            renderItem={renderItem}
            keyExtractor={(item, index) => index + "item"}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {loading && <Loading />}
      </View>
      <Three60View
        _360_url={Property._360_url}
        isVisible={show360View}
        height={screenHeight * 0.85}
        width={screenWidth * 0.95}
        show360ViewHandler={() => setshow360View(!show360View)}
      />
      <ShowVideoDisplay />
      <ShowPropertyImageView
        isVisible={showPropertySubImage}
        showPropertySubImageHanlder={showPropertySubImageHanlder}
        images={imageUrl}
      />
    </>
  );
};
export default PropertyDetails;
