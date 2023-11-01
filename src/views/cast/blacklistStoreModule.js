import axiosIns from "@/libs/axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 要更改返正確的API 接口, for demo only
    fetchBlacklists(cts, queryParams){
        return new Promise((resolve, reject) => {
            axiosIns.get('/blacklists', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    addBlacklistAddress(cts, data)
    {
        return new Promise((resolve, reject) => {
            axiosIns.post('/blacklists', data)
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    removeBlacklistAddress(cts, queryParams)
    {
        return new Promise((resolve, reject) => {
            axiosIns.delete('/blacklists', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    }
  },
};
