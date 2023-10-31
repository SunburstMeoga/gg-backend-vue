import axiosIns from "@/libs/axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 要更改返正確的API 接口, for demo only
    fetchRouleetes(cts, queryParams){
        return new Promise((resolve, reject) => {
            axiosIns.get('/rouleetes', {params: queryParams})
            .then(response=>resolve(response))
            .catch(error=>reject(error))
        })
    }
  },
};
