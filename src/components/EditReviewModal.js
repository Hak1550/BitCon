import axios from "axios";
import I18n from "i18n-js";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { baseUrl, routes } from "../apis";
import { colors, fontSize, fontWeight, screenHeight } from "../assets";

const EditReviewModal = ({
  editableItem,
  isVisible,
  handleShowModal,
  setLoading,
}) => {
  const [feedback, setFeedback] = useState(editableItem?.feedback);
  const [ratingPoint, setRatingPoint] = useState();
  const [check, setCheck] = useState();

  console.log("====================================");
  console.log("EditableItem : ", editableItem);
  console.log("====================================");

  const onFinishRating = (rating) => {
    console.log("====================================");
    console.log("Rating In the function : ", rating);
    console.log("====================================");
    setRatingPoint(rating);
    if (!feedback) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleEditReview = async () => {
    if (ratingPoint && feedback) {
      const payload = {
        ratingId: parseInt(editableItem?.id),
        userId: parseInt(editableItem?.user_id),
        newRating: parseInt(ratingPoint),
        newFeedback: feedback,
      };
      setCheck(false);
      setLoading(true);
      await axios
        .put(baseUrl + routes.editReview, payload)
        .then((response) => {
          handleShowModal();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response) {
            console.log(
              "Response Error:",
              JSON.stringify(error.response, null, 2)
            );
          } else {
            console.log("General Error:1", error.message);
          }
        });
    } else {
      setCheck(true);
    }
  };

  return (
    <Modal
      animationIn="zoomInUp"
      animationOut="zoomInRight"
      onModalHide={handleShowModal}
      onBackdropPress={handleShowModal}
      visible={isVisible}
      backdropOpacity={0.2}
      transparent={true}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.modalInsideContailer}>
        <View style={styles.modalContentView}>
          <View style={styles.editView}>
            <View />
            <Text style={styles.editTitleStyle}>{I18n.t("Edit Review")}</Text>
            <TouchableOpacity onPress={handleShowModal}>
              <Image
                style={styles.crossIconStyle}
                source={require("../assets/icons/cross.png")}
              />
            </TouchableOpacity>
          </View>
          <Rating
            defaultRating={editableItem?.rating ? editableItem?.rating : 0}
            type="custom"
            ratingColor={colors.primary}
            imageSize={35}
            startingValue={editableItem?.rating ? editableItem?.rating : 0}
            onFinishRating={onFinishRating}
            ratingCount={5}
          />
          <Text style={[styles.titleStyle, {}]}>
            {I18n.t("Leave a Review")}
          </Text>
          <TextInput
            placeholderTextColor={colors.placeholderTextColor}
            multiline
            style={styles.inputStyle}
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            placeholder={I18n.t("Your Review")}
          />
          {check && (
            <Text style={{ color: colors.red }}>
              {I18n.t("reviewValidation")}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleEditReview}
            activeOpacity={0.7}
            style={styles.btnStyle}
          >
            <Text style={{ color: colors.black, fontWeight: "bold" }}>
              {I18n.t("Save")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalInsideContailer: {
    backgroundColor: "#00000050",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentView: {
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  editView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editTitleStyle: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  crossIconStyle: {
    height: 25,
    width: 25,
  },
  titleStyle: {
    fontSize: fontSize["5"],
    fontWeight: fontWeight[600],
    color: colors.black,
    marginTop: screenHeight * 0.015,
    marginBottom: screenHeight * 0.001,
  },
  inputStyle: {
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
  },
  btnStyle: {
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
  },
});

export default EditReviewModal;
