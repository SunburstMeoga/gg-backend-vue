<template>
    <div>
        <b-card title="卡池"></b-card>
        <pool-stat :pool="pool" v-for="(pool, index) in poolList" :key="`pool_${index}`"/>
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
} from "bootstrap-vue";
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import poolStoreModule from "./poolStoreModule";
import PoolStat from "./PoolStat.vue";

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
        PoolStat
    },
    setup(){
        const POOL_STORE_MODULE_NAME = 'pool';

        if (!store.hasModule(POOL_STORE_MODULE_NAME))
            store.registerModule(POOL_STORE_MODULE_NAME, poolStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(POOL_STORE_MODULE_NAME))
                store.unregisterModule(POOL_STORE_MODULE_NAME);
        });

        const poolList = ref([
            {
                name: '200',
                sales_quantity: 200,
                total_quantity: 1000,
                sale_quantity: 100,
                remain_amount: 500
            },
            {
                name: '600',
                sales_quantity: 200,
                total_quantity: 1000,
                sale_quantity: 100,
                remain_amount: 500
            },
            {
                name: '2000',
                sales_quantity: 200,
                total_quantity: 1000,
                sale_quantity: 100,
                remain_amount: 500
            },
            {
                name: '6000',
                sales_quantity: 200,
                total_quantity: 1000,
                sale_quantity: 100,
                remain_amount: 500
            }
        ])

        return {
            poolList
        }



    }
}

</script>