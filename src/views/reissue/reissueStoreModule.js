import axiosIns from "@/libs/axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 要更改返正確的API 接口, for demo only
    fetchReissues(cts, queryParams){
        return new Promise((resolve, reject) => {
            axiosIns.get('/reissues', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
     addReissueAddress(cts, data)
    {
        return new Promise((resolve, reject) => {
            axiosIns.post('/reissues', data)
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    removeReissueAddress(cts, queryParams)
    {
        return new Promise((resolve, reject) => {
            axiosIns.delete('/reissues', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    },
    fetchTokenOptions(cts, queryParams){
        return new Promise((resolve, reject) => {
            axiosIns.get('/tokens/options', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    }
  },
};
