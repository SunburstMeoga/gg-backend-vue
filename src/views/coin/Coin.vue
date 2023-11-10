<template>
    <div>
        <b-card :title="coin.symbol" :key="`coin_${trigger}`">
        </b-card>
        <!--貨幣數據-->
        <b-row class="match-height">
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="TrendingUpIcon" :statistic="Math.round(statistic.total_supply)"
                    statistic-title="總產量" color="success" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="CpuIcon" :statistic="Math.round(statistic.today_supply)"
                    statistic-title="今日產量" color="warning" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="RotateCwIcon" :statistic="Math.round(statistic.market_circulation)"
                    statistic-title="市場流通" color="danger" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="UsersIcon" :statistic="Math.round(statistic.address_average)"
                    statistic-title="地址平均值" color="info" />
            </b-col>
        </b-row>

        <b-card no-body class="mb-0">
            <div class="m-2">
                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class="
                    d-flex
                    align-items-center
                    justify-content-start
                    mb-1 mb-md-0
                  ">
                        <label>Show</label>
                        <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" />
                        <label>entries</label>
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="searchQuery" class="d-inline-block mr-1"
                                placeholder="Search Address..." />
                        </div>
                    </b-col>
                </b-row>
            </div>

            <b-table ref="refAddressListTable" class="position-relative" :items="fetchAddresses" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
                empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
            </b-table>

            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6" class="
                    d-flex
                    align-items-center
                    justify-content-center justify-content-sm-start
                  ">
                        <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
                            {{ dataMeta.of }} entries</span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6" class="
                    d-flex
                    align-items-center
                    justify-content-center justify-content-sm-end
                  ">
                        <b-pagination v-model="currentPage" :total-rows="totalAddresses" :per-page="perPage" first-number
                            last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BButton,
    BAlert,
    BLink,
    BCardBody,
    BCardText,
    BFormInput,
    BPagination,
    BTable,
} from "bootstrap-vue";
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import router from "@/router";
import vSelect from "vue-select";
import StatisticCardVertical from "@core/components/statistics-cards/StatisticCardVertical.vue";
import coinStoreModule from "./coinStoreModule";
import useAddressList from "./useAddressList"
//權限
//import ability from '@/libs/acl/ability'

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BButton,
        BAlert,
        BLink,
        BCardBody,
        BCardText,
        BTable,
        BFormInput,
        BPagination,
        StatisticCardVertical,
        vSelect,
    },
    watch:{
        $route(to, from){
        this.fetchCoin()
        }
    },  
    setup() {
        const ADDRESS_STORE_MODULE_NAME = 'coin-address';
        const trigger = ref(false)

        const coin = ref({
            symobl: 'PMT',
            total_supply: 10000,
            today_supply: 100,
            market_circulation: 5000,
            address_average: 50
        })

        if (!store.hasModule(ADDRESS_STORE_MODULE_NAME))
            store.registerModule(ADDRESS_STORE_MODULE_NAME, coinStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(ADDRESS_STORE_MODULE_NAME))
                store.unregisterModule(ADDRESS_STORE_MODULE_NAME);
        });

        onMounted(() => {
            fetchCoin();
        })

        const fetchCoin = () => {
            console.log('fetchCoin', router.currentRoute.name)
            if (router.currentRoute.name == "coins-wgt") {
                coin.value.symbol = 'WGT';
                symbol.value = 'WGT';
            } else if (router.currentRoute.name == "coins-wgt-a") {
                coin.value.symbol = 'WGT-A';
                symbol.value = "WGT-A"
            }
            trigger.value = !trigger.value;
            fetchBalance();
        }

        const {
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
            symbol,
            addr,
            fetchBalance,
            statistic,
        } = useAddressList();


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
            coin,
            fetchCoin,
            trigger,
            symbol,
            addr,
            fetchBalance,
            statistic
        }
    }



}


</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@/assets/scss/variables/_variables.scss";

.card .card-title {
    margin-bottom: 0px;
}
</style>