<template>
    <div>
        <!-- <b-alert variant="primary" show>
            <div class="alert-body">
                <span><strong>黑名單：</strong> 只允許購買配套，無法購買NFT和獲得動態收益</span>
            </div>
        </b-alert> -->
        <b-card title="" title="收益参数"></b-card>

        <b-table ref="refBlacklistListTable" class="position-relative" :items="fetchBlacklists" responsive
            :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
            :sort-desc.sync="isSortDirDesc">
            <template #cell(action)="data">
                <div class="delete" @click="handleDelete(data.item)">
                    <span class="align-middle ml-50">刪除</span>
                </div>



            </template>
        </b-table>

        <b-card no-body class="mb-0">
            <!-- <div class="m-2">
                <b-row>
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

                    <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="搜尋黑名單地址..." />
                        </div>
                    </b-col>
                </b-row>
            </div> -->

            <b-table ref="refBlacklistListTable" class="position-relative" :items="fetchBlacklists" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
                empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
                <template #cell(action)="data">
                    <div class="delete" @click="handleDelete(data.item)">
                        <span class="align-middle ml-50">刪除</span>
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
                        <b-pagination v-model="currentPage" :total-rows="totalBlacklists" :per-page="perPage" first-number
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
    BCardBody,
    BCardText,
    BFormInput,
    BPagination,
    BTable,
    BInputGroup,
    BInputGroupAppend
} from "bootstrap-vue";
import blacklistStoreModule from "./blacklistStoreModule";
import useBlacklistList from "./useBlacklistList"
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";

export default {
    data() {
        return {
            address: '',
            trigger: 0
        }
    },
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
    methods: {
        handleSubmit() {
            this.$swal({
                title: "確定新增黑名單地墐?",
                text: "",
                showCancelButton: true,
                confirmButtonText: "新增",
                cancelButtonText: "取消",
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {

                }
            });
        },
        handleDelete(item) {
            this.$swal({
                title: "確定刪除?",
                text: "",
                showCancelButton: true,
                confirmButtonText: "刪除",
                cancelButtonText: "取消",
                customClass: {
                    confirmButton: "btn btn-danger",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    this.showMessage('Fail', '還没連接API', 'HeartIcon', 'danger')
                    //連接API儲存數據
                    /*    store.dispatch("blacklist/removeBlacklistAddress", item.id)
                           .then((response) => {
                               this.refetchData();
                               this.showMessage(
                                   "Success",
                                   response.data.message,
                                   "CheckIcon",
                                   "success"
                               );
                           })
                           .catch((error) => {
                               console.log(error);
                               this.showMessage('Fail', error.response.data.message, 'HeartIcon', 'danger')
                           }); */
                }
            })
        }
    },
    setup() {
        const BLACKLIST_STORE_MODULE_NAME = 'blacklist';

        if (!store.hasModule(BLACKLIST_STORE_MODULE_NAME))
            store.registerModule(BLACKLIST_STORE_MODULE_NAME, blacklistStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(BLACKLIST_STORE_MODULE_NAME))
                store.unregisterModule(BLACKLIST_STORE_MODULE_NAME);
        });

        const {
            fetchBlacklists,
            tableColumns,
            perPage,
            currentPage,
            totalBlacklists,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refBlacklistListTable,
            showMessage
        } = useBlacklistList();

        return {
            fetchBlacklists,
            tableColumns,
            perPage,
            currentPage,
            totalBlacklists,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refBlacklistListTable,
            showMessage
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