<template>
    <div>
        <b-card :title="name" />
        <!--貨幣數據-->
        <b-row class="match-height">
            <b-col xl="2" md="2" sm="6" cols="6" v-for="(item, index) in nfts" :key="index">
                <b-card :title="item.name">
                    <!-- :header="`总量:${item.count}`" :footer="`剩余数量:${item.surplus}`"  -->
                    <b-card-text style="margin-top:10px;">
                        <b-button class="w-100" href="#" variant="success" size="sm">{{ `总量：${item.total_set}` }}</b-button>
                    </b-card-text>
                    <b-card-text>
                        <b-button class="w-100" href="#" variant="danger" size="sm">{{ `市场剩余：${item.total_set - item.total_count}`
                        }}</b-button>
                    </b-card-text>
                </b-card>
            </b-col>
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
import tokenStoreModule from "./tokenStoreModule";
import useTokenList from "./useTokenList"
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
            this.fetchToken()
        }
    },
    setup() {
        const TOKEN_STORE_MODULE_NAME = 'token';
        const trigger = ref(false)
        const name = ref(null)


        if (!store.hasModule(TOKEN_STORE_MODULE_NAME))
            store.registerModule(TOKEN_STORE_MODULE_NAME, tokenStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(TOKEN_STORE_MODULE_NAME))
                store.unregisterModule(TOKEN_STORE_MODULE_NAME);
        });

        onMounted(() => {
            fetchToken();
        })

        const fetchToken = () => {
            if (router.currentRoute.name == "character-card") {
                name.value = '角色卡'
                tokenTypeFilter.value = 1
            } else if (router.currentRoute.name == "campaign-token") {
                name.value = '出征令牌'
                tokenTypeFilter.value = 2
            } else if (router.currentRoute.name == "scrooge-card") {
                //财神卡
                name.value = '财神卡'
                tokenTypeFilter.value = 3
            } else if (router.currentRoute.name == "wild-card") {
                //战法道具卡
                name.value = '战法道具卡'
                tokenTypeFilter.value = 4
            } else if (router.currentRoute.name == "composite-card") {
                //合成道具卡
                name.value = '合成道具卡'
                tokenTypeFilter.value = 5
            }
            trigger.value = !trigger.value;
        }

        const {
            tokenTypeFilter,
            showMessage,
            refetchData,
            nfts,
        } = useTokenList();


        return {
            tokenTypeFilter,
            showMessage,
            refetchData,
            nfts,
            name,
            fetchToken
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