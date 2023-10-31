import axiosIns from '@/libs/axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
      fetchRoles(ctx, queryParams) {
        return new Promise((resolve, reject) => {
          axiosIns.get(`/role/list`, {params:queryParams})
          .then(response => resolve(response))
          .catch(error => reject(error))
        })
      },
      fetchRole(ctx, queryParams) {
        return new Promise((resolve, reject) => {
            axiosIns.get('/role', {params:queryParams})
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      addRole(ctx, data) {
        return new Promise((resolve, reject) => {
            axiosIns.post('/role', data)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      updateRole(ctx,data) {
          return new Promise((resolve, reject) => {
            axiosIns.post('/role/setRolePermission', data)
            .then(response => resolve(response))
            .catch(error => reject(error))
          })
      }
    },
  }