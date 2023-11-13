<template>
    <div>
        <b-overlay
        :show="loading"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
    >
        <b-row>
            <b-col cols="12">
                <b-card title="收益参数">
                    <b-table class="position-relative" :fields="incomeTableColumns" :items="items" responsive>
                        <template #cell(current)="data">
                            <div>
                                <v-select v-model="data.item.current" :options="options" label="label" :clearable="false"
                                    :reduce="val => val.value" />
                            </div>
                        </template>
                        <template #cell(confirm)="data">

                            <div class="delete" @click="handleEdit(data.item)">
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
                                        placeholder="Search NFT名称..." />
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
                            <div class="delete" @click="handleDaySet(data.item)">
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
    BCardBody,
    BCardText,
    BFormInput,
    BPagination,
    BTable,
    BInputGroup,
    BInputGroupAppend,
    BOverlay
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
        vSelect,
        BOverlay
    },
    methods: {
        handleEdit(item) {
            this.$swal({
                title: "確認更改"+item.type,
                text: "",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    let data = { setting: item.current }
                    let apiPath = (item.id == 1)?'setAWga':'setBWga'
                    this.loading = true;
                    store.dispatch('nft/'+apiPath, data)
                        .then((response) => {
                            //this.refetchData();
                            this.fetchGameInfo();
                            this.showMessage(
                                "Success",
                                response.data.message,
                                "CheckIcon",
                                "success"
                            );
                            this.loading = false;
                        })
                        .catch((error) => {
                            console.log(error);
                            this.showMessage('Fail', error.response.data.message, 'HeartIcon', 'danger')
                            this.loading = false;
                        });
                }


            })
        },
        handleDaySet(item) {
            if (!item.changeNum) {
                this.$swal({
                    title: "请输入要变更的数量",
                    text: "",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                })
                return
            }

            this.$swal({
                title: "確認更改每日發售數量?",
                text: "",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    let data = { tokenId: item.tokenId, limit: item.changeNum }

                    this.loading = true;
                    store.dispatch('nft/setDaySets', data)
                        .then((response) => {
                            this.refetchData();
                            this.showMessage(
                                "Success",
                                response.data.message,
                                "CheckIcon",
                                "success"
                            );
                            this.loading = false;
                        })
                        .catch((error) => {
                            console.log(error);
                            this.showMessage('Fail', error.response.data.message, 'HeartIcon', 'danger')
                            this.loading = false;
                        });
                }


            })
        }
    },
    setup() {
        const NFT_STORE_MODULE_NAME = "nft"
        const loading = ref(false)

        const incomeTableColumns = ref([
            { key: "type", label: "" },
            { key: "current", label: "变更" },
            { key: "confirm", label: "确认" },
        ])

/*         const items = ref([
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
        ]) */

        const options = ref([
            { label: "wga", value: false },
            { label: "wga或者wgt", value: true },
        ])

        if (!store.hasModule(NFT_STORE_MODULE_NAME))
            store.registerModule(NFT_STORE_MODULE_NAME, nftStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(NFT_STORE_MODULE_NAME))
                store.unregisterModule(NFT_STORE_MODULE_NAME);
        });

        onMounted(() => {
            fetchGameInfo();
        })

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
            showMessage,
            fetchGameInfo,
            items
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
            options,
            showMessage,
            loading,
            fetchGameInfo,
            items
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