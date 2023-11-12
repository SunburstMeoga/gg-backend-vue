import axiosIns from "@/libs/axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 要更改返正確的API 接口, for demo only
    fetchCasting(cts, queryParams){
        return new Promise((resolve, reject) => {
            axiosIns.get('/casting', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    updateCasting(ctx, data){
        return new Promise((resolve, reject) => {
            axiosIns.put('/casting', data)
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    fetchNfts(cts, queryParams){
      return new Promise((resolve, reject) => {
          axiosIns.get('/tokens/nfts', {params: queryParams})
          .then(response=>resolve(response))
          .catch(error=>reject(error))
      })
  },
  },
};
