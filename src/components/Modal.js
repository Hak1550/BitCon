import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { colors, fontSize, fontWeight, screenHeight, screenWidth } from '../assets';
import WebView from "react-native-webview";
import I18n from 'i18n-js';

const Three60View = ({
    isVisible,
    onClose,
    navigation,
    height,
    width,
    show360ViewHandler,
    _360_url
}) => {
    const [loading, setLoading] = useState(false)

    return (
        !isVisible ? null :
            <Modal
                isVisible={isVisible}
                onModalHide={show360ViewHandler}
                onBackdropPress={show360ViewHandler}
                animationOutTiming={500}
                backdropOpacity={0.76}
                style={{ alignItems: 'center' }}
            >
                <View
                    style={{
                        height: height,
                        width: width,
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
                    <WebView
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        source={{ uri: _360_url }}
                        style={{ flex: 1 }}
                    />
                    {loading && <ActivityIndicator style={{ position: 'absolute', top: screenHeight * 0.44, left: screenWidth * 0.44 }} size={'large'} />}
                </View>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        // top: screenHeight * 0.1,
                        bottom:0,
                        width: screenWidth * 0.3,
                        height: screenHeight * 0.032,
                        borderRadius: screenHeight * 25 / 1000,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary
                    }}
                    onPress={show360ViewHandler}
                >
                    <Text style={[{
                        justifyContent: 'center', fontSize: fontSize['3.5'],
                        fontWeight: fontWeight[400],
                        color: colors.black,
                    }]}>{I18n.t('Close')}</Text>
                </TouchableOpacity>
            </Modal>
    )
}

export default Three60View;

const styles = StyleSheet.create({})