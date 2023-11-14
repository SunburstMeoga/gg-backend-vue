import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useReissueList(){
    const toast = useToast()

    const refReissueListTable = ref(null)
    
    const tableColumns = [
        {key: 'id', label: 'id'},
        {key: 'tokenId', label: 'tokenId'},
        {key: 'from_to', label: 'from/to'},
        {key: 'token_type_name', label: 'NFT類型'},
        {key: 'name', label: 'NFT'},
        {key: 'utc', label: '更新時間'},
        {key: 'state'},
        {key: 'txid'},
        {key: 'action', label: '操作'},
    ];

    const perPage = ref(10)
    const totalReissues = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
        const localItemsCount = refReissueListTable.value ? refReissueListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1: 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalReissues.value,
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
        refReissueListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    const tokenOptions = ref([])

    const fetchTokenOptions = () => {
        store.dispatch('reissue/fetchTokenOptions', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            tokenOptions.value = response.data.tokens
        })
    }

    const fetchReissues = (ctx, callback) => {

         store.dispatch('reissue/fetchReissues', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { reissues, total} = response.data
            callback(reissues)
            totalReissues.value = total
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
        fetchReissues,
        tableColumns,
        perPage,
        currentPage,
        totalReissues,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refetchData,
        refReissueListTable,
        showMessage,
        tokenOptions,
        fetchTokenOptions
    }

}