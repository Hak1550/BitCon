import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { colors, fontSize, fontWeight, screenHeight, screenWidth } from '../assets';
import WebView from "react-native-webview";
import I18n from 'i18n-js';

const Loading = ({
}) => {
    return (
            <Modal
                isVisible={true}
                animationOutTiming={500}
                backdropOpacity={0.76}
                style={{ alignItems: 'center' }}
            >
                <View
                    style={{
                        height: screenHeight*0.1,
                        width: screenWidth*0.2,
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
                        justifyContent:'center'
                    }}
                >
                    <ActivityIndicator  size={'large'} />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Text style={[{
                        justifyContent: 'center', fontSize: fontSize['3.5'],
                        fontWeight: fontWeight[400],
                        color: colors.black,
                    }]}>{I18n.t('Loading')}...</Text>
                </TouchableOpacity>
                </View>
                {/* position: 'absolute', top: screenHeight * 0.44, left: screenWidth * 0.44 }} */}
            </Modal>
    )
}

export default Loading;

const styles = StyleSheet.create({})