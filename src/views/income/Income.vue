<template>
    <div>
        <b-row>
            <b-col cols="12">
                <b-card title="收益参数">
                    <b-table class="position-relative" :fields="incomeTableColumns" :items="items">
                        <template #cell(change)="data">
                            <div>
                               <v-select v-model="data.item.selected" :options="options" label="label" :clearable="false"  :reduce="val => val.value"/>
                            </div>
                        </template>
                        <template #cell(confirm)="data">
     
                            <div class="delete" @click="handleDelete(data.item)" >
                                <!-- <span class="align-middle ml-50">刪除</span> -->
                                <b-button variant="success">确认变更</b-button>
                            </div>
                        </template>
                    </b-table>
                </b-card>

            </b-col>
        </b-row>


        <b-row>

            <b-col cols="12">
                <b-card class="mb-0" title="发售参数">
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
                                    :options="perPageOptions" :clearable="false"
                                    class="per-page-selector d-inline-block mx-50" />
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
                        <template #cell(remain)="data">
                            {{ data.item.total_set - data.item.total_count }}
                        </template>
                        <template #cell(changeNum)="data">
                            <div class="">
                                <!-- <span class="align-middle ml-50">刪除</span> -->
                                <b-form-input v-model="data.item.changeNum" placeholder="请输入要变更的数量"></b-form-input>
                            </div>
                        </template>
                        <template #cell(confirm)="data">
                            <div class="delete" @click="handleDelete(data.item)">
                                <!-- <span class="align-middle ml-50">刪除</span> -->
                                <b-button variant="success">确认</b-button>
                            </div>
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
                                <b-pagination v-model="currentPage" :total-rows="totalAddresses" :per-page="perPage"
                                    first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item"
                                    next-class="next-item">
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
    BCardBody,
    BCardText,
    BFormInput,
    BPagination,
    BTable,
    BInputGroup,
    BInputGroupAppend
} from "bootstrap-vue";

import nftStoreModule from "./nftStoreModule";
import useAddressList from "./useAddressList"
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BButton,
        BAlert,
        BCardBody,
        BCardText,
        BFormInput,
        BPagination,
        BTable,
        BInputGroup,
        BInputGroupAppend,
        vSelect
    },
    setup() {
        const NFT_STORE_MODULE_NAME = "nft"

        const incomeTableColumns = ref([
            { key: "type", label: "" },
            { key: "current", label: "当前" },
            { key: "change", label: "变更" },
            { key: "confirm", label: "确认" },
        ])

        const items = ref([
        {
            type: "角色卡",
            current: "WGT或WGT-A",
        },
        {
            type: "WGT财神卡",
            current: "收益：WGT或WGT-A",
        },
        {
            type: "WGT-A财神卡",
            current: "本金WGT-A",
        },
        ])

        const options = ref([
            { label: "WGT", value: "WGT" },
            { label: "WGT-A", value: "WGT-A" },
        ])

        if (!store.hasModule(NFT_STORE_MODULE_NAME))
            store.registerModule(NFT_STORE_MODULE_NAME, nftStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(NFT_STORE_MODULE_NAME))
                store.unregisterModule(NFT_STORE_MODULE_NAME);
        });

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
            incomeTableColumns,
            items,
            options
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

.delete {
    color: #ff0000;
    cursor: pointer;
    transition: all 0.3s ease;
}

.delete:hover {
    transform: translateY(-2px);
    text-decoration: underline;
}
</style>