<template>
    <b-card title="">
        <b-row>
            <b-col cols="12">
                <h4>鑄造</h4>
            </b-col>
            <b-col cols="12">
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
                        <template #cell(actions)="data">
                            <div class="return" @click="handleReturn(data.item)">
                                <span class="align-middle ml-50">回收</span>
                            </div>
                          </template>
                          <template #cell(changeNum)="data">
                            <div class="">
                                <!-- <span class="align-middle ml-50">刪除</span> -->
                                <b-form-input v-model="data.item.changeNum" placeholder="请输入要铸造的数量"></b-form-input>
                            </div>
                        </template>
                        <template #cell(confirm)="data">
                            <div class="delete" @click="handleDelete(data.item)">
                                <!-- <span class="align-middle ml-50">刪除</span> -->
                                <b-button variant="success">铸造</b-button>
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

    </b-card>
</template>

<script>
import {
    BRow,
    BCol,
    BCard,
    BButton,
    BAlert,
    BFormInput,
    BPagination,
    BTable,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend
} from "bootstrap-vue";
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import router from "@/router";
import vSelect from "vue-select";
import castingStoreModule from "./castingStoreModule";
import useAddressList from "./useAddressList"

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BButton,
        BAlert,
        BFormGroup,
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
                title: "確認儲存?",
                text: "",
                showCancelButton: true,
                confirmButtonText: "儲存",
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
        }
    },
    setup() {
        const CASTING_STORE_MODULE_NAME = 'casting';

        if (!store.hasModule(CASTING_STORE_MODULE_NAME))
            store.registerModule(CASTING_STORE_MODULE_NAME, castingStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(CASTING_STORE_MODULE_NAME))
                store.unregisterModule(CASTING_STORE_MODULE_NAME);
        });

        onMounted(() => {
            //fetchCasting()
        })

        const set = ref(3)
        const box = ref(4)
        const set_id = ref(1)
        const amount = ref(null)

        const setOptions = ref([
            {
                id: 1,
                name: 200
            },
            {
                id: 2,
                name: 600
            },
            {
                id: 3,
                name: 2000
            },
            {
                id: 4,
                name: 6000
            },
            {
                id: 5,
                name: 20000
            },
        ])

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

        const fetchCasting = () => {
            store.dispatch(CASTING_STORE_MODULE_NAME + '/fetchCasting')
                .then(response => {
                    set.value = response.data
                    box.value = response.data
                })
                .error(error => {
                    console.log(error)
                })
        }

        return {
            set,
            box,
            set_id,
            amount,
            fetchCasting,
            setOptions,
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

.return{
    color: green;
    cursor: pointer;
    transition: all 0.3s ease;
}

.return:hover{
    transform: translateY(-2px);
    text-decoration: underline;
}

</style>