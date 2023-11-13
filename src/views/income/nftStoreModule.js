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
        setDaySets(ctx, data)
        {
            return new Promise((resolve, reject) => {
                axiosIns.post('/nfts/day-sets', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
            })
        },
        fetchGameInfo(ctx, queryParams){
            return new Promise((resolve, reject) => {
                axiosIns.get('/games/info', {params: queryParams})
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        },
        setAWga(ctx, data){
            //set-a-wga
            return new Promise((resolve, reject) => {
                axiosIns.post('/games/set-a-wga', data)
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        },
        setBWga(ctx, data){
            //set-b-wga
            return new Promise((resolve, reject) => {
                axiosIns.post('/games/set-b-wga', data)
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        }
    }
}