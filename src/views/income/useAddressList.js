import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useAddressList(){
    const toast = useToast()

    const refAddressListTable = ref(null)
    
    const tableColumns = [
        {key: 'tokenId', label: 'TokenID'},
        {key: 'token_type.name', label: 'NFT类型'},
        {key: 'name', label: 'NFT名称'},
/*         {key: 'total_set', 'label': '总量'},
        {key: 'total_count', 'label': '已铸造'}, */
        { key: "remain", label: "未发售数量" },
        { key: "daySet", label: "当前每日发售数量"},
        {key: "changeNum", label: "变更每日发售数量" },
        {key: "confirm", label: "确认变更" }
    ];

    const perPage = ref(10)
    const totalAddresses = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('tokenId')
    const isSortDirDesc = ref(false)

    const dataMeta = computed(() => {
        const localItemsCount = refAddressListTable.value ? refAddressListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1: 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalAddresses.value,
        }
    })

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
        refAddressListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    const fetchAddresses = (ctx, callback) => {

         store.dispatch('nft/fetchNfts', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { tokens, total} = response.data
            callback(tokens)
            totalAddresses.value = total
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

    return {
        fetchAddresses,
        tableColumns,
        perPage,
        currentPage,
        totalAddresses,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refetchData,
        refAddressListTable,
    }
}