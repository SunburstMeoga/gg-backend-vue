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
    setBlacklistAddress(cts, data)
    {
        return new Promise((resolve, reject) => {
            axiosIns.post('/games/set-blacklist', data)
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
  },
};
