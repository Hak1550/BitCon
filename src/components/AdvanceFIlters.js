import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  colors,
  fontSize,
  fontWeight,
  icons,
  screenHeight,
  screenWidth,
} from "../assets";
import I18n from "i18n-js";

const AdvanceFilters = ({
  styles,
  showCategoriesModal,
  handleShowModal,
  handleApplyFilters,
}) => {
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);
  const [propertyName, setPropertyName] = useState(null);

  const [Amenities, setAmenities] = useState([
    { id: "has_air_conditioners", title: "Air Condition", checked: false },
    { id: "has_cable_tv", title: "Cable TV", checked: false },
    { id: "has_ventillation", title: "Ventilation", checked: false },
    { id: "is_ceiling", title: "Ceiling Height", checked: false },
    { id: "has_garage", title: "Garage", checked: false },
    { id: "has_heating", title: "Heating", checked: false },
    { id: "has_wifi", title: "Wi-Fi", checked: false },
    { id: "has_intercorm", title: "Intercom", checked: false },
    { id: "has_parking", title: "Parking", checked: false },
    { id: "is_furnished", title: "Furnished", checked: false },
    { id: "has_fire_place", title: "Fireplace", checked: false },
    { id: "has_garden", title: "Garden", checked: false },
    { id: "is_pet_friendly", title: "Pet Friendly", checked: false },
    // { id: 15, title: 'Security', checked: false },
    { id: "has_swimming_pool", title: "Swimming Pool", checked: false },
    { id: "is_floor_available", title: "Floor", checked: false },
    // { id: 'has_window', title: 'Window Type', checked: false },
    // { id: 18, title: 'Renovation', checked: false },
  ]);

  const handleAdvanceFiltersFilters = (item, index) => {
    Amenities[index].checked = !Amenities[index].checked;
    setAmenities([...Amenities]);
  };

  const ApplyFilters = () => {
    let qParams;
    // Filter items with checked === true
    const checkedFilters = Amenities.filter((item) => item.checked);

    // Map the checked items to query string format
    const queryStringArray = checkedFilters.map(
      (item) => `filter=${item.id}&filterValue=true`
    );
    // Join the array into a single query string
    const queryString = queryStringArray.join("&");

    if (propertyName && priceFrom && priceTo) {
      qParams = `filter=$title&filterValue=$${propertyName}&filter=@price&filterValue=@${priceFrom}-${priceTo}&`;
    } else if (propertyName) {
      qParams = `filter=$title&filterValue=$${propertyName}&`;
    } else if (priceFrom && priceTo) {
      qParams = `filter=@price&filterValue=@${priceFrom}-${priceTo}&`;
    }

    if (checkedFilters?.length > 0) {
      if (qParams) {
        qParams = qParams + queryString;
      } else {
        qParams = queryString;
      }
    }

    console.log("apply called", qParams);
    handleApplyFilters(qParams);

    // let qParams = `filter=$title&filterValue=$${propertyName}&filter=@price&filterValue=@${priceFrom}-${priceTo}&${queryString}`
    // handleApplyFilters(qParams)
  };

  const amenitiesView = ({ item, index }) => (
    <>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          padding: screenWidth * 0.025,
          width: screenWidth * 0.32,
        }}
      >
        <TouchableOpacity
          style={[
            styles.checkBoxStyle,
            { backgroundColor: item.checked ? colors.primary : colors.white },
          ]}
          onPress={() => handleAdvanceFiltersFilters(item, index)}
        />
        <Text
          style={{
            fontSize: fontSize["3"],
            fontWeight: fontWeight[600],
            color: colors.black,
            paddingLeft: screenWidth * 0.025,
          }}
        >
          {I18n.t(item.title)}
        </Text>
      </View>
    </>
  );

  return (
    <Modal
      animationIn="zoomInUp"
      animationOut="zoomInRight"
      onModalHide={handleShowModal}
      onBackdropPress={handleShowModal}
      isVisible={showCategoriesModal}
      // animationInTiming={1500}
      // animationOutTiming={1000}
      backdropOpacity={0.2}
      style={{
        top: screenHeight * 0.12,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View style={[styles.modalInsideContailer, {}]}>
        <TouchableOpacity
          onPress={handleShowModal}
          style={styles.crossPlacementStyle}
        >
          <Image style={styles.crossIconStyle} source={icons["cross"]} />
        </TouchableOpacity>
        <Text style={[styles.advanceFiltersTextStyle, { textAlign: "center" }]}>
          {I18n.t("Advance Filters")}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            width: screenWidth * 0.45,
            alignSelf: "center",
            marginHorizontal: screenHeight * 0.01,
          }}
        />
        <TextInput
          style={[styles.searchByNameInput, {}]}
          placeholder={I18n.t("Search by name")}
          placeholderTextColor={colors.placeholderTextColor}
          onChangeText={(text) => setPropertyName(text)}
          value={propertyName}
        />

        <Text
          style={[
            styles.advanceFiltersTextStyle,
            {
              paddingBottom: screenHeight * 0.02,
              marginHorizontal: screenWidth * 0.065,
            },
          ]}
        >
          {I18n.t("Price Range")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "space-between",
          }}
        >
          <TextInput
            // keyboardType='number-pad'
            style={[styles.InputContainer, {}]}
            placeholder={I18n.t("Price from")}
            placeholderTextColor={colors.placeholderTextColor}
            onChangeText={(text) => /^\d*$/.test(text) && setPriceFrom(text)}
            value={priceFrom}
          />
          <View style={{ width: screenWidth * 0.05 }} />
          <TextInput
            // keyboardType='number-pad'
            style={styles.InputContainer}
            placeholder={I18n.t("Price to")}
            placeholderTextColor={colors.placeholderTextColor}
            onChangeText={(text) => /^\d*$/.test(text) && setPriceTo(text)}
            value={priceTo}
          />
        </View>
        <Text
          style={[
            styles.advanceFiltersTextStyle,
            {
              paddingBottom: screenHeight * 0.02,
              marginHorizontal: screenWidth * 0.065,
            },
          ]}
        >
          {I18n.t("Amenities")}
        </Text>

        <View style={{ alignItems: "center" }}>
          <FlatList
            numColumns={3}
            data={Amenities}
            // inverted={I18nManager.isRTL}
            renderItem={amenitiesView}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.applyBtnStyle} onPress={ApplyFilters}>
            <Text
              style={[styles.searchPropertyText, { justifyContent: "center" }]}
            >
              {I18n.t("Apply")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
            data={categoryTypes}
            inverted={I18nManager.isRTL}
            renderItem={listView}
            keyExtractor={(item, index) => index + 'item'}
            showsVerticalScrollIndicator={false}
          /> */}
      </View>
    </Modal>
  );
};

export default AdvanceFilters;
