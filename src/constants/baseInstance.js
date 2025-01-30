import axios from "axios";
//import { store } from '../redux/store';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL
})

//console.log('base url', import.meta.env.VITE_APP_BASE_URL)

// instance.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${store.getState().auth.user?.token}`;
//     return config;
// });


export default instance

