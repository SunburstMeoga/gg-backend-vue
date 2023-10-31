import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_SERVICE_URL,
  //baseURL: localStorage.getItem('server')+'/api/user',
  // timeout: 1000,
   headers: {'Authorization': 'Bearer '+localStorage.getItem('accessToken')}
})

// Add a response interceptor
axiosIns.interceptors.response.use( (response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response dat
  return response;
},  (error) =>  {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status == 401){
    localStorage.clear();
    this.$router.replace('/login')
  }


  return Promise.reject(error);
});

Vue.prototype.$http = axiosIns

export default axiosIns
