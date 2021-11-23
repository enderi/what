import axios from "axios";

import router from './router'
import store from "./vuex";

axios.defaults.baseURL = "/api/"; // change this if you want to use a different url for APIs
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

axios.interceptors.response.use(response =>{
    return response
}, (error) => {
    if(401 === error.response.status) {
        localStorage.removeItem("token");
        store.dispatch("user", null);
        router.push({name: 'login'})
    } else {
        return Promise.reject(error)
    }
});