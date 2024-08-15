import { View, Image, Text, TouchableOpacity } from "react-native";
import { icons, screenHeight, screenWidth } from "../assets";

export const Header = ({
    height,
    width,
    paddingHorizontal,
    backgroundColor,
    showRightIcon,
    showTitleInCenter,
    title,
    leftIconSource,
    tintColor,
    rightIconSource,
    onBackPress
}) => {
    const leftIcon = {
        width: (screenHeight * 28) / 1000,
        height: (screenHeight * 28) / 1000,
        tintColor: tintColor ? tintColor : '#E0E0E0',
        // fontWeight: '900',
        alignSelf: 'center',
    }
    return (
        !showTitleInCenter ?
            (<View
                style={{
                    backgroundColor: backgroundColor,
                    height: height,
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: paddingHorizontal
                }}>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={onBackPress}>
                    <Image source={leftIconSource ? leftIconSource : icons['right-arrow']} style={leftIcon} />
                    <Text style={{ color: '#222222', fontSize: screenHeight * 20 / 1000, alignSelf: 'center' }}>{title}</Text>
                </TouchableOpacity>
                {showRightIcon && <Image source={rightIconSource ? rightIconSource : icons['right-arrow']} style={leftIcon}  />}

            </View>)
            :
            (
                <View
                    style={{
                        height: height,
                        width: width,
                        flexDirection: 'row',
                        paddingHorizontal: paddingHorizontal,
                    }}>
                    <TouchableOpacity
                    style={{justifyContent:'center'}}
                        onPress={onBackPress}>
                        <Image
                            source={leftIconSource ? leftIconSource : icons['right-arrow']}
                            style={{
                                width: (screenHeight * 28) / 1000,
                                height: (screenHeight * 28) / 1000,
                                tintColor: tintColor ? tintColor : '#E0E0E0',
                                // fontWeight: '900',
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#222222', fontSize: screenHeight * 20 / 1000, alignSelf: 'center', alignContent: 'center' }}>{title}</Text>
                    </View>
                    {showRightIcon && <Image
                        source={rightIconSource ? rightIconSource : icons['right-arrow']}
                        style={{
                            width: (screenHeight * 28) / 1000,
                            height: (screenHeight * 28) / 1000,
                            tintColor: tintColor ? tintColor : '#E0E0E0',
                            // fontWeight: '900',
                            alignSelf: 'center',
                        }}
                    />}
                </View>
            )
    )
}