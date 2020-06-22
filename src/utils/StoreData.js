import { AsyncStorage } from 'react-native';

export default store = {
    async save(key, data) {
        const saved = await AsyncStorage.setItem(key, JSON.stringify(data))
        return saved
    },

    async saveAccess(key, post) {
        let userData = await AsyncStorage.getItem(key);
        userData = JSON.parse(userData);

        if(!userData['accesses']) userData['accesses'] = [];
        userData['accesses'].push({ category: post.category });

        return this.save(key, userData)
    },

    async get(key) {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data);
    }
}