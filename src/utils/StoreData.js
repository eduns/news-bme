import { AsyncStorage } from 'react-native';

export default store = {
    async save(key, data) {
        const saved = await AsyncStorage.setItem(key, JSON.stringify(data))
        return saved
    },

    async get(key) {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data);
    }
}