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
        setWgtA(ctx, data){
            //set-a-wga
            return new Promise((resolve, reject) => {
                axiosIns.post('/games/set-wgt-a', data)
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        },
        setWgtB(ctx, data){
            //set-b-wga
            return new Promise((resolve, reject) => {
                axiosIns.post('/games/set-wgt-b', data)
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        },
        setWgaB(ctx, data){
            //set-b-wga
            return new Promise((resolve, reject) => {
                axiosIns.post('/games/set-wga-b', data)
                .then(response=>resolve(response))
                .catch(error=>reject(error))
            })
        }
    }
}