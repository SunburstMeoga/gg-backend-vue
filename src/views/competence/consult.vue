<template>
    <div>
        <b-card title="查询地址">
        </b-card>
        <!-- <b-alert variant="primary" show>
            <div class="alert-body">
                <span><strong>黑名單：</strong> 只允許購買配套，無法購買NFT和獲得動態收益</span>
            </div>
        </b-alert> -->
        <b-card title="">
            <b-row>
                <b-col cols="12" md="12">
                    <b-input-group>
                        <b-form-input v-model="addr" class="d-inline-block mr-1" placeholder="輸入钱包地址..." />
                        <b-input-group-append>
                            <b-button variant="success" style="margin:0;padding:0 10px;"
                                @click="handleQuery()">查询</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </b-card>
        <!--貨幣數據-->
        <b-overlay :show="loading_stat" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
            <b-row class="match-height">
                <b-col xl="3" md="3" sm="6" cols="6">
                    <statistic-card-vertical class="statistic-box" icon="TrendingUpIcon"
                        :statistic="Math.round(statistic.reward_type_1)" statistic-title="个⼈贡献值" color="success" />
                </b-col>
                <b-col xl="3" md="3" sm="6" cols="6">
                    <statistic-card-vertical class="statistic-box" icon="CpuIcon"
                        :statistic="Math.round(statistic.reward_type_6)" statistic-title="团队业绩" color="warning" />
                </b-col>
                <b-col xl="3" md="3" sm="6" cols="6">
                    <statistic-card-vertical class="statistic-box" icon="RotateCwIcon"
                        :statistic="Math.round(statistic.number_of_invite)" statistic-title="邀请数量" color="danger" />
                </b-col>
                <b-col xl="3" md="3" sm="6" cols="6">
                    <statistic-card-vertical class="statistic-box" icon="UsersIcon"
                        :statistic="Math.round(Number(statistic.income_personal))" statistic-title="个人收益值" color="info" />
                </b-col>
            </b-row>
        </b-overlay>
        <b-overlay :show="loading_nft" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
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
                    <!-- <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="searchQuery" class="d-inline-block mr-1"
                                placeholder="Search Address..." />
                        </div>
                    </b-col> -->
                </b-row>
            </div>


            <b-table ref="refAddressListTable" class="position-relative" :items="fetchAddresses" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
                empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
                <template #cell(utc)="data">
                    {{ timestampToDateTIme(data.item.utc)}}
                </template>
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
    </b-overlay>
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
    BInputGroup,
    BInputGroupAppend,
    BOverlay,
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
        BInputGroup,
        BInputGroupAppend,
        StatisticCardVertical,
        vSelect,
        BOverlay
    },
    watch: {
        $route(to, from) {
            this.fetchCoin()
            
        }
    },
    mounted() {
        this.fetchStat()
    },
    methods: {
        handleQuery() {
            this.fetchStat();
            this.searchQuery = this.addr;
        }
    },
    setup() {
        const ADDRESS_STORE_MODULE_NAME = 'address';
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
            if (router.currentRoute.name == "coins-pmt") {
                coin.value.symbol = 'PMT';
            } else if (router.currentRoute.name == "coins-mt") {
                coin.value.symbol = 'MT';
            } else if (router.currentRoute.name == "coins-rt") {
                coin.value.symbol = 'RT';
            } else if (router.currentRoute.name == "coins-bt") {
                coin.value.symbol = 'BT';
            }
            trigger.value = !trigger.value;
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
            fetchStat,
            addr,
            statistic,
            loading_stat,
            loading_nft
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
            fetchStat,
            addr,
            statistic,
            loading_stat,
            loading_nft
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