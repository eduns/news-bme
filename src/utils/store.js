import { AsyncStorage } from 'react-native';

export default store = {
    save(key, data) {
        AsyncStorage.setItem(
            key, JSON.stringify(data),
            (error) => {
                if(error) {
                    console.error(`SAVE ERROR: ${error.message}`)
                    return false
                }
            }
        )
        return true
    },

    get(key) {
        AsyncStorage.getItem(key, (error, data) => {
            if (error) {
                console.error(`GET ERROR: ${error.message}`)
                return null
            }
            return JSON.parse(data)
        })
    },

    delete(key) {
        AsyncStorage.removeItem(key, (error) => {
            if (error) { 
                console.error(`DELETE ERROR: ${error.message}`)
                return false
            }
        })
        return true
    }
}