import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'


import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useAddressList(){
    const toast = useToast()

    const refAddressListTable = ref(null)
    
    const tableColumns = [
        {key: 'addr', label: '地址'},
        {key: 'v', label: '剩餘量'},
      /*   {key: 'last_update', label: '最後交易NFT時間'}, */
    ];

    const perPage = ref(10)
    const totalAddresses = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const searchQuery = ref('')
    const sortBy = ref('v')
    const isSortDirDesc = ref(true)

    const addr = ref(null)
    const symbol = ref(null)
    const statistic = ref({total_supply: 0, total_circulation: 0, today_supply: 0, "24h_supply": 0, total_address: 0, market_circulation: 0, address_average: 0, contract_address: '', symbol: ""})

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

    watch([currentPage, perPage, searchQuery, symbol], () => {
        refetchData()
    })

    const fetchBalance = () => {
        if (symbol.value) {
            store
              .dispatch("coin-address/fetchStat", {
                symbol: symbol.value
              })
              .then((response) => {
                statistic.value = {...statistic.value, ...response.data}
              })
              .catch((error) => {
                    console.log(error)
              });
          }
      }

    const fetchAddresses = (ctx, callback) => {
        if (symbol.value) {
          store
            .dispatch("coin-address/fetchAddresses", {
              q: searchQuery.value,
              perPage: perPage.value,
              page: currentPage.value,
              sortBy: sortBy.value,
              sortDesc: isSortDirDesc.value,
              symbol: symbol.value
            })
            .then((response) => {
              const { addresses, total } = response.data;
              callback(addresses);
              totalAddresses.value = total;
            })
            .catch(() => {
              toast({
                component: ToastificationContent,
                props: {
                  title: "Error fetching addresses list",
                  icon: "AlertTriangleIcon",
                  variant: "danger",
                },
              });
            });
        }
      };

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
        addr,
        symbol,
        fetchBalance,
        statistic
    }







    




}