import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useBlacklistList(){
    const toast = useToast()

    const refBlacklistListTable = ref(null)
    
    const tableColumns = [
        {key: 'addr', label: '地址'},
        {key: 'utc', label: '更新時間'},
        {key: 'action', label: '操作'},
    ];

    const perPage = ref(10)
    const totalBlacklists = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('addr')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
        const localItemsCount = refBlacklistListTable.value ? refBlacklistListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1: 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalBlacklists.value,
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
        refBlacklistListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    const fetchBlacklists = (ctx, callback) => {

         store.dispatch('blacklist/fetchBlacklists', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { blacks, total} = response.data
            callback(blacks)
            totalBlacklists.value = total
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
        fetchBlacklists,
        tableColumns,
        perPage,
        currentPage,
        totalBlacklists,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refetchData,
        refBlacklistListTable,
        showMessage
    }

}