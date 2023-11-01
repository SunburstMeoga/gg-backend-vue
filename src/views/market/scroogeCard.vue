<template>
    <div>
        <b-card title="WGT财神卡" />
        <!--貨幣數據-->
        <b-row class="match-height">
            <b-col xl="2" md="2" sm="6" cols="6" v-for="(item, index) in characterCards" :key="index">
                <b-card :title="item.title">
                    <!-- :header="`总量:${item.count}`" :footer="`剩余数量:${item.surplus}`"  -->
                    <b-card-text style="margin-top:10px;">
                        <b-button href="#" variant="success" size="sm">{{ `总量：${item.count}` }}</b-button>
                    </b-card-text>
                    <b-card-text>

                        <b-button href="#" variant="danger" size="sm">{{ `市场剩余：${item.surplus}` }}</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
            <!-- <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col>
            <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col>
            <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col> -->
        </b-row>

        <b-card title="WGTA财神卡" />
        <!--貨幣數據-->
        <b-row class="match-height">
            <b-col xl="2" md="2" sm="6" cols="6" v-for="(item, index) in characterCards" :key="index">
                <b-card :title="item.title">
                    <!-- :header="`总量:${item.count}`" :footer="`剩余数量:${item.surplus}`"  -->
                    <b-card-text style="margin-top:10px;">
                        <b-button href="#" variant="success" size="sm">{{ `总量：${item.count}` }}</b-button>
                    </b-card-text>
                    <b-card-text>

                        <b-button href="#" variant="danger" size="sm">{{ `市场剩余：${item.surplus}` }}</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
            <!-- <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col>
            <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col>
            <b-col xl="2" md="2" sm="6" cols="6">
                <b-card title="美髯公">
                </b-card>
            </b-col> -->
        </b-row>


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
        vSelect
    },
    watch: {
        $route(to, from) {
            this.fetchCoin()
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

        const characterCards = ref([
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },
            { title: '美髯公', count: 300, surplus: 200 },

        ])

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
            characterCards
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