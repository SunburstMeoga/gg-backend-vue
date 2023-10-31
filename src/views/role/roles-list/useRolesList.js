import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ability from '@/libs/acl/ability'

export default function useRolesList() {

    //User toast
    const toast = useToast()

    const refRoleListTable = ref(null)

    const tableColumns = [
        {key: 'name', sortable: true, label: '角色名稱'},
        {key: 'action', label: '操作'}
    ]

    const perPage = ref(10)
    const totalRoles = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
        const localItemsCount = refRoleListTable.value ? refRoleListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalRoles.value,
        }
    })

    const refetchData = () => {
        refRoleListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    const fetchRoles = (ctx, callback) => {
        store.dispatch('app-role/fetchRoles',{
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response =>{
            const {roles, total} = response.data
            callback(roles)
            totalRoles.value = total
        
        })
        .catch((error) => {
            console.log(error)
            toast({
                component: ToastificationContent,
                props: {
                    title: 'Error fetching role list',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger'
                }
            })
        })
    }

    return {
        fetchRoles,
        tableColumns,
        perPage,
        currentPage,
        totalRoles,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refRoleListTable,
        ability,
        refetchData
    }

}