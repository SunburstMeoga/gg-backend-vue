import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'


const config = {
    loginEndpoint: process.env.VUE_APP_SERVICE_URL+'/login',
    logoutEndpoint: process.env.VUE_APP_SERVICE_URL+'/logout'  
}

const { jwt } = useJwt(axios, config)
export default jwt
