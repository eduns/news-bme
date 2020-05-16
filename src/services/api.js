import axios from 'axios';
import { BING_API_KEY, BING_API_URL } from 'react-native-dotenv';

const api = axios.create({
    baseURL: BING_API_URL,
    headers: { 'Ocp-Apim-Subscription-Key': BING_API_KEY }
})

export default api