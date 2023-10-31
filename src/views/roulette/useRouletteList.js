import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useRouletteList(){
    const toast = useToast()

    const refRouletteListTable = ref(null)
    const rouleetes = ref([])
    
    const tableColumns = [
        {key: 'id', label: 'id'},
        {key: 'prize_type_id', label: '類型'},
        {key: 'name', label: '名稱'},
        {key: 'winning_percentage', label: '當前中獎機率'},
        {key: 'update_winning_percentage', label: '變更中獎機率'},
        {key: 'prize_value', label: '當前收益%'},
        {key: 'update_prize_value', label: '變更收益%'},
    ];

    const prizeTypeOptions = [
        {
            id: 1,
            name: '收益加速器',
        },
        {
            id: 2,
            name: '業績承諾卡',
        },
        {
            id: 3,
            name: '每日收益',
        },
        {
            id: 4,
            name: '推薦褔利',
        }
    ]

    const perPage = ref(25)
    const totalRoulettes = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('rouleete')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
        const localItemsCount = refRouletteListTable.value ? refRouletteListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1: 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalRoulettes.value,
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
        refRouletteListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    const fetchRoulettes = (ctx, callback) => {

        let rouleete = [
            {
                id: 1,
                name: '收益率1',
                prize_type_id: 1,
                winning_percentage: 10,
                prize_value: 12
            },
            {
                id: 2,
                name: '收益率2',
                prize_type_id: 1,
                winning_percentage: 10,
                prize_value: 24
            },
            {
                id: 3,
                name: '收益率3',
                prize_type_id: 1,
                winning_percentage: 10,
                prize_value: 36
            },
            {
                id: 4,
                name: '收益率1',
                prize_type_id: 2,
                winning_percentage: 10,
                prize_value: 10
            },
            {
                id: 5,
                name: '收益率2',
                prize_type_id: 2,
                winning_percentage: 10,
                prize_value: 10
            },
            {
                id: 6,
                name: '收益率3',
                prize_type_id: 2,
                winning_percentage: 10,
                prize_value: 10
            },
            {
                id: 7,
                name: '收益率1',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 0.5
            },
            {
                id: 8,
                name: '收益率2',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 1
            },
            {
                id: 9,
                name: '收益率3',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 2
            },
            {
                id: 10,
                name: '收益率4',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 3
            },
            {
                id: 11,
                name: '收益率5',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 4
            },
            {
                id: 12,
                name: '收益率6',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 5
            },
            {
                id: 13,
                name: '收益率7',
                prize_type_id: 3,
                winning_percentage: 10,
                prize_value: 6
            },
            {
                id: 14,
                name: '收益率1',
                prize_type_id: 4,
                winning_percentage: 10,
                prize_value: 0.5
            },
            {
                id: 15,
                name: '收益率2',
                prize_type_id: 4,
                winning_percentage: 10,
                prize_value: 1
            },
            {
                id: 16,
                name: '收益率3',
                prize_type_id: 4,
                winning_percentage: 10,
                prize_value: 2
            },
            {
                id: 17,
                name: '收益率4',
                prize_type_id: 4,
                winning_percentage: 10,
                prize_value: 3
            },
            {
                id: 18,
                name: '收益率5',
                prize_type_id: 4,
                winning_percentage: 10,
                prize_value: 4
            }
        ]

        rouleete = rouleete.map(item => {
            return {...item, update_winning_percentage: item.winning_percentage, update_prize_value: item.prize_value}
        })

        rouleetes.value = rouleete

        callback(rouleete)
        totalRoulettes.value = rouleete.length

        /* store.dispatch('rouleete/fetchRoulettes', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { rouleetes, total} = response.data
            callback(rouleetes)
            totalRoulettes.value = total
        })
        .catch(() => {
            toast({
                component: ToastificationContent,
                props: {
                  title: 'Error fetching rouleetes list',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                },
            })
        }) */

    }

    return {
        fetchRoulettes,
        tableColumns,
        perPage,
        currentPage,
        totalRoulettes,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refetchData,
        refRouletteListTable,
        prizeTypeOptions,
        rouleetes,
        showMessage
    }







    




}