import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useTokenList(){
    const toast = useToast()
    const tokenTypeFilter = ref(null)
    const nfts = ref([])

    const showMessage = (title,text,icon, variant) =>{
        toast({
            component: ToastificationContent,
            props: {
              title,
              text,
              icon,
              variant
            },
        })
    }

    const refetchData = () =>{
        if(!tokenTypeFilter.value) return
        store.dispatch('token/fetchTokens', {
            token_type_id: tokenTypeFilter.value
        })
        .then(response => {
            console.log(response.data.tokens)
            nfts.value = response.data.tokens
        })
        .catch(() => {
            toast({
                component: ToastificationContent,
                props: {
                  title: 'Error fetching addresses list',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                },
            })
        })
    }

    watch([tokenTypeFilter], () => {
        refetchData()
    })

    return {
        tokenTypeFilter,
        showMessage,
        refetchData,
        nfts,
    }






}