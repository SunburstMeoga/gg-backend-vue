<template>
    <div>
        <b-overlay :show="loading" spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
            <b-card title="補發管理" :key="`reissue_${trigger}`">
                <b-row>
                    <b-col cols="12" md="12">

                        <b-row>
                            <b-col cols="12" md="3" class="mt-1">
                                <b-form-input v-model="address" class="d-inline-block mr-1" placeholder="輸入地址" />
                            </b-col>
                            <b-col cols="12" md="3" class="mt-1">
                                <flat-pickr v-model="utc" class="form-control"
                                    :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }" placeholder="請選擇補發時間" />
                            </b-col>
                            <b-col cols="12" md="3" class="mt-1">
                                <v-select v-model="tokenId" :options="tokenOptions" :filter="typeSearch" label="name"
                                    :reduce="(val) => val.tokenId" placeholder="請選擇補發NFT種類">
                                    <template #option="{ token_type_name, name }">
                                        [{{ token_type_name }}] {{ name }}
                                    </template>
                                    <template #selected-option="{ token_type_name, name }">
                                        [{{ token_type_name }}] {{ name }}
                                    </template>
                                </v-select>
                            </b-col>


                            <b-col cols="12" md="2" class="mt-1">
                                <b-button @click="handleSubmit()" variant="success">
                                    補發
                                </b-button>
                            </b-col>
                        </b-row>

                    </b-col>
                </b-row>
            </b-card>
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
                                <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="搜尋地址..." />
                            </div>
                        </b-col>
                    </b-row>
                </div>

                <b-table ref="refReissueListTable" class="position-relative" :items="fetchReissues" responsive
                    :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
                    empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
                    <template #cell(utc)="data"><span v-if="data.item.utc">{{ timestampToDateTIme(data.item.utc)
                    }}</span></template>
                    <template #cell(action)="data">
                        <div class="delete" @click="handleDelete(data.item)">
                            <span class="align-middle ml-50">刪除</span>
                        </div>
                    </template>
                    <template #cell(from_to)="data">
                        <p v-if="data.item.owner">{{ data.item.owner }}</p>
                        <p v-if="data.item.income_addr">{{ data.item.income_addr }}</p>

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
                            <b-pagination v-model="currentPage" :total-rows="totalReissues" :per-page="perPage" first-number
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
    BCardBody,
    BCardText,
    BFormInput,
    BPagination,
    BTable,
    BInputGroup,
    BInputGroupAppend,
    BOverlay
} from "bootstrap-vue";
import reissueStoreModule from "./reissueStoreModule";
import useReissueList from "./useReissueList"
import store from "@/store";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";
import flatPickr from 'vue-flatpickr-component'


export default {
    data() {
        return {
            address: '',
            trigger: 0,
            tokenId: null,
            utc: this.getCurrentDateTime(),
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
        vSelect,
        BOverlay,
        flatPickr,
    },
    methods: {
        getCurrentDateTime() {
            var now = new Date();

            var year = now.getFullYear();
            var month = (now.getMonth() + 1).toString().padStart(2, '0');  // JavaScript months are 0-based
            var day = now.getDate().toString().padStart(2, '0');
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');

            var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

            return formattedDateTime;
        },
        convertHKTimeToTimestamp(hkDateTime) {
            if (!hkDateTime) {
                return;
            }
            // Replace space with 'T' to make the string ISO 8601 compliant
            var compliantDateTime = hkDateTime.replace(' ', 'T');

            // Parse the Hong Kong datetime string into a Date object
            var hkDate = new Date(compliantDateTime + "+08:00");

            // Check if the date is valid
            if (isNaN(hkDate.getTime())) {
                throw new Error('Invalid time value');
            }

            // Convert the HK date object to a Unix timestamp (in seconds)
            var timestamp = Math.floor(hkDate.getTime() / 1000);

            return timestamp;
        },

        typeSearch(options, search) {
            var returnOptions = options.filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.token_type_name.toLowerCase().includes(search.toLowerCase())
            })
            return returnOptions
        },
        handleSubmit() {
            if (!this.address || this.address == '') {
                this.showMessage('Fail', '請輸入補發地址', 'HeartIcon', 'danger')
            }
            if (!this.tokenId || this.tokenId == null) {
                this.showMessage('Fail', '請選擇補發NFT種類', 'HeartIcon', 'danger')
            }

            this.$swal({
                title: "確定新增補發地址嗎?",
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
                    this.loading = true;
                    store.dispatch("reissue/addReissueAddress", { tokenId: this.tokenId, income_addr: this.address, utc: this.convertHKTimeToTimestamp(this.utc) })
                        .then((response) => {
                            this.loading = false;
                            this.refetchData();
                            this.address = '';
                            this.showMessage(
                                "Success",
                                response.data.message,
                                "CheckIcon",
                                "success"
                            );
                        })
                        .catch((error) => {
                            console.log(error);
                            this.loading = false
                            this.showMessage('Fail', error.response.data.message, 'HeartIcon', 'danger')
                        });
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
                    //this.showMessage('Fail', '還没連接API', 'HeartIcon', 'danger')
                    //連接API儲存數據
                    this.loading = true;
                    store.dispatch("reissue/removeReissueAddress", { id: item.id })
                        .then((response) => {
                            this.loading = false;
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
                            this.loading = false;
                            this.showMessage('Fail', error.response.data.message, 'HeartIcon', 'danger')
                        });
                }
            })
        }
    },
    setup() {
        const BLACKLIST_STORE_MODULE_NAME = 'reissue';
        const loading = ref(false)


        if (!store.hasModule(BLACKLIST_STORE_MODULE_NAME))
            store.registerModule(BLACKLIST_STORE_MODULE_NAME, reissueStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(BLACKLIST_STORE_MODULE_NAME))
                store.unregisterModule(BLACKLIST_STORE_MODULE_NAME);
        });

        onMounted(() => {
            fetchTokenOptions();
        })

        const {
            fetchReissues,
            tableColumns,
            perPage,
            currentPage,
            totalReissues,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refReissueListTable,
            showMessage,
            tokenOptions,
            fetchTokenOptions
        } = useReissueList();

        return {
            fetchReissues,
            tableColumns,
            perPage,
            currentPage,
            totalReissues,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refReissueListTable,
            showMessage,
            loading,
            tokenOptions,
            fetchTokenOptions
        }

    }
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@/assets/scss/variables/_variables.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';

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

.v-select ::placeholder {
    color: lightgray;
    /* Replace with your desired color */
}
</style>