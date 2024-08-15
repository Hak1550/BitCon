import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { colors, icons, screenHeight, screenWidth } from "../assets";
import FastImage from "react-native-fast-image";

const ShowPropertyImageView = ({
  isVisible,
  images,
  showPropertySubImageHanlder,
}) => {
  const [imageUrl, setImageUrl] = useState(images);

  console.log(imageUrl, "images", images);

  useEffect(() => {
    setImageUrl(images);
  }, [images]);

  return !isVisible ? null : (
    <Modal
      onModalHide={showPropertySubImageHanlder}
      onBackdropPress={showPropertySubImageHanlder}
      isVisible={isVisible}
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
          onPress={showPropertySubImageHanlder}
          style={{
            position: "absolute",
            zIndex: 100,
            alignSelf: "flex-end",
            padding: screenHeight * 0.01,
          }}
        >
          <Image
            style={{
              width: screenWidth * 0.1,
              height: screenWidth * 0.1,
              tintColor: colors.white,
            }}
            source={icons["cross"]}
          />
        </TouchableOpacity>
        {imageUrl.collection[0] &&
          imageUrl.collection[0] != imageUrl.current && (
            <TouchableOpacity
              onPress={() => {
                console.log(
                  imageUrl.collection[0],
                  "current at left",
                  imageUrl.current
                );
                setImageUrl({
                  current: imageUrl.collection[0],
                  collection: [imageUrl.collection[0], imageUrl.collection[1]],
                });
                // imageUrl.current = imageUrl.collection[0]
              }}
              style={{
                position: "absolute",
                zIndex: 100,
                padding: screenHeight * 0.01,
                top: screenHeight * 0.115,
              }}
            >
              <Image
                style={{
                  width: screenWidth * 0.1,
                  height: screenWidth * 0.1,
                  tintColor: colors.primary,
                }}
                source={icons["iconLeft"]}
              />
            </TouchableOpacity>
          )}
        {imageUrl.collection[1] &&
          imageUrl.collection[1] != imageUrl.current && (
            <TouchableOpacity
              onPress={() => {
                console.log(
                  imageUrl.collection[1],
                  "current at right",
                  imageUrl.current
                );
                setImageUrl({
                  current: imageUrl.collection[1],
                  collection: [imageUrl.collection[0], imageUrl.collection[1]],
                });
                // imageUrl.current = imageUrl.collection[1]
              }}
              style={{
                position: "absolute",
                zIndex: 100,
                alignSelf: "flex-end",
                padding: screenHeight * 0.01,
                top: screenHeight * 0.115,
              }}
            >
              <Image
                style={{
                  width: screenWidth * 0.1,
                  height: screenWidth * 0.1,
                  tintColor: colors.primary,
                }}
                source={icons["iconRight"]}
              />
            </TouchableOpacity>
          )}
        <FastImage
          resizeMode="cover"
          style={[
            {
              height: screenHeight * 0.3,
              width: screenWidth * 0.9,
              borderRadius: screenHeight * 0.012,
            },
          ]}
          source={{ uri: imageUrl.current }}
        />
      </View>
    </Modal>
  );
};

export default ShowPropertyImageView;

const styles = StyleSheet.create({});
