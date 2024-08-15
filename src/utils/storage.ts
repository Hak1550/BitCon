import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_DATA = '@sesson:data'

export const setLoggedInData = async (data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(USER_DATA, jsonValue);
    } catch (error) {
        console.log({ error })
    }
};

export const getLoggedInData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_DATA);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log({ error })
    }
};

export const clearAllLoggedData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log({ error })
    }
    console.log('Done.')
}