import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useStatisticList(){
    const toast = useToast()

    const refStatisticListTable = ref(null)
    
    const tableColumns = [
        {key: 'id', label: '排名'},
        {key: 'address', label: '地址'},
        {key: 'amount', label: '今日產出MT的數量'},
    ];

    const tableDynamicColumns = [
        {key: 'name', label: '獎金'},
        {key: 'value', label: '今日累計數據'},
        {key: 'bt', label: '今日生產的BT'}
    ]

    const tableStaticColumns = [
        {key: 'name', label: '獎品'},
        {key: 'value', label: '今日發獎次數'},
    ]

    const dynamicData = [
        {
            name: '直推獎金',
            value: '直推次數: 100次',
            bt: 999123
        },
        {
            name: '對碰獎金',
            value: '對碰PV: 200131PV',
            bt: 600448
        },
        {
            name: '代數獎金',
            value: '產生36次代數獎金',
            bt: 36774
        },
    ]

    const staticData = [
        {
            name: '收益加速器',
            value: 999123,
        },
        {
            name: '業績承諾卡',
            value: 600448,
        },
        {
            name: '每日收益',
            value: 36774,
        },
        {
            name: '推薦褔利',
            value: 50500,
        }
    ]

    const perPage = ref(10)
    const totalStatistics = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    const dataMeta = computed(() => {
        const localItemsCount = refStatisticListTable.value ? refStatisticListTable.value.localItems.length : 0
        return {
            from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1: 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalStatistics.value,
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
        refStatisticListTable.value.refresh()
    }

    watch([currentPage, perPage, searchQuery], () => {
        refetchData()
    })

    
    const fetchDynamicData = (ctx, callback) => {
        let dynamicData = [
            {
                name: '直推獎金',
                value: '直推次數: 100次',
                bt: 999123
            },
            {
                name: '對碰獎金',
                value: '對碰PV: 200131PV',
                bt: 600448
            },
            {
                name: '代數獎金',
                value: '產生36次代數獎金',
                bt: 36774
            },
        ]

        callback(dynamicData)
    }

    const fetchStaticData = (ctx, callback) => {
        let staticData = [
            {
                name: '收益加速器',
                value: 999123,
            },
            {
                name: '業績承諾卡',
                value: 600448,
            },
            {
                name: '每日收益',
                value: 36774,
            },
            {
                name: '推薦褔利',
                value: 50500,
            }
        ]

        callback(staticData)


    }

    const fetchStatistics = (ctx, callback) => {

        let statistic = [
            {
                id: 1,   
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 2,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 3,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 4,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 5,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 6,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 7,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 8,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 9,
                address: '0x0002....2asd',
                amount: 987654321,
            },
            {
                id: 10,
                address: '0x0002....2asd',
                amount: 987654321,
            }
        ]
        callback(statistic)
        totalStatistics.value = statistic.length

        /* store.dispatch('statistic/fetchStatistics', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
        })
        .then(response => {
            const { statistics, total} = response.data
            callback(statistics)
            totalStatistics.value = total
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
        }) */

    }

    return {
        fetchStatistics,
        tableColumns,
        perPage,
        currentPage,
        totalStatistics,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refetchData,
        refStatisticListTable,
        fetchDynamicData,
        fetchStaticData,
        tableDynamicColumns,
        tableStaticColumns,
        showMessage,
        dynamicData,
        staticData
    }







    




}