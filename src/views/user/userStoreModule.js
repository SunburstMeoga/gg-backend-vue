import axios from '@axios'
import axiosIns from '@/libs/axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get('/user/list', {params:queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    fetchUser(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/user`, {params:queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/user', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateUser(ctx, userData) {
      return new Promise((resolve, reject) => {
         axiosIns.post('/user', userData)
         .then(response=>resolve(response))
         .catch(error=>reject(error))
      })
    },
  },
}
