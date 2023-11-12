import axiosIns from "@/libs/axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchNfts(cts, queryParams){
            return new Promise((resolve, reject) => {
                axiosIns.get('/tokens/nfts', {params: queryParams})
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        },
    }
}