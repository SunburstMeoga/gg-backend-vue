<template>
    <div>
        <!-- <b-alert variant="primary" show>
            <div class="alert-body">
                <span><strong>黑名單：</strong> 只允許購買配套，無法購買NFT和獲得動態收益</span>
            </div>
        </b-alert> -->

        <b-card title="铸造" style="market-top:10px;"></b-card>
        <b-card no-body class="mb-0">
            <b-table class="position-relative" :items="tableReleaseParameters" responsive :fields="releaseParametersItems"
                primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc">
                <template #cell(changeNum)="data">
                    <div class="">
                        <!-- <span class="align-middle ml-50">刪除</span> -->
                        <b-form-input v-model="text" placeholder="请输入要铸造的数量"></b-form-input>
                    </div>
                </template>
                <template #cell(confirm)="data">
                    <div class="delete" @click="handleDelete(data.item)">
                        <!-- <span class="align-middle ml-50">刪除</span> -->
                        <b-button variant="success">铸造</b-button>
                    </div>
                </template>
            </b-table>


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
import blacklistStoreModule from "../competence/blacklistStoreModule";
import useBlacklistList from "../competence/useBlacklistList"
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";

export default {
    data() {
        return {
            address: "",
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
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-outline-primary ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    this.showMessage("Fail", "還没連接API", "HeartIcon", "danger")
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
                               this.showMessage("Fail", error.response.data.message, "HeartIcon", "danger")
                           }); */
                }
            })
        }
    },
    setup() {
        const BLACKLIST_STORE_MODULE_NAME = "blacklist";
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
        const releaseParametersItems = ref([
            { key: "id", label: "ID" },
            { key: "type", label: "NFT类型" },
            { key: "name", label: "NFT名称" },

            { key: "notYetSale", label: "市场总量" },
            { key: "currentNum", label: "市场剩余" },
            { key: "changeNum", label: "铸造数量" },
            { key: "confirm", label: "铸造" }
        ])
        const tableReleaseParameters = ref([
            {
                id: "1",
                type: "角色卡",
                name: "美髯公",
                notYetSale: "333",
                currentNum: "9999",
            },
            {
                id: "1",
                type: "角色卡",
                name: "汉寿侯",
                notYetSale: "333",
                currentNum: "9999",
            },
            {
                id: "1",
                type: "战法道具卡",
                name: "孟获",
                notYetSale: "333",
                currentNum: "9999",
            },
        ])
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
            showMessage,
            releaseParametersItems,
            tableReleaseParameters
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