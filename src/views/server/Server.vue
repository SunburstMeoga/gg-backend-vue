<template>
    <b-card title="後台使用中的合約地址">
        <b-form class="mt-1">
            <b-form-group
            label="game_contract_address"
            label-for="game_contract_address"
            label-cols-md="4"
          >
            <b-form-input
              id="game_contract_address"
              :disabled="true"
              v-model="serverInfo.game_contract_address"
            />
          </b-form-group>
          <b-form-group
            label="nft_contract_address"
            label-for="nft_contract_address"
            label-cols-md="4"
          >
            <b-form-input
              id="nft_contract_address"
              :disabled="true"
              v-model="serverInfo.nft_contract_address"
            />
          </b-form-group>
          <b-form-group
            label="popularized_contract_address"
            label-for="popularized_contract_address"
            label-cols-md="4"
          >
            <b-form-input
              id="popularized_contract_address"
              :disabled="true"
              v-model="serverInfo.popularized_contract_address"
            />
          </b-form-group>
          <b-form-group
            label="rpc_url"
            label-for="rpc_url"
            label-cols-md="4"
          >
            <b-form-input
              id="rpc_url"
              :disabled="true"
              v-model="serverInfo.rpc_url"
            />
          </b-form-group>
        </b-form>
    </b-card>
</template>
<script>
import {
    BCard,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
} from "bootstrap-vue";
import { ref, onMounted, onUnmounted, watch } from "@vue/composition-api";
import store from "@/store";
import serverStoreModule from "./serverStoreModule"


export default{
    components:{
        BCard,
        BRow,
        BCol,
        BForm,
        BFormGroup,
        BFormInput,
    },
    setup(){

        const serverInfo = ref({})

        const SERVER_STORE_MODULE_NAME = "server";

        if (!store.hasModule(SERVER_STORE_MODULE_NAME))
            store.registerModule(SERVER_STORE_MODULE_NAME, serverStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(SERVER_STORE_MODULE_NAME))
                store.unregisterModule(SERVER_STORE_MODULE_NAME);
        });

        onMounted(() => {
            console.log('mounted')
            store
                .dispatch("server/fetchServerInfo", {})
                .then(response => {
                    serverInfo.value = response.data.data
                })
                .catch((error) => {

                })
        });

        return {
            serverInfo
        }

    }


}


</script>