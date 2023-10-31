<template>
    <div>
        <b-alert variant="primary" show>
            <div class="alert-body">
                <span><strong>輪盤參數：</strong> 輪盤系數（影響輪盤整體的抽獎概率）、每個獎品的抽獎概率</span>
            </div>
        </b-alert>
        <b-card title="輪盤系數" :key="`coin_${trigger}`">
            <b-row>
                <b-col cols="12" md="12">
                    <b-form-group class="" label="輪盤系數" label-for="coefficient" label-cols-md="4">
                        <b-input-group>
                            <b-form-input id="coefficient" v-model="coefficient" />
                            <b-input-group-append>
                                <b-button variant="success" style="margin:0;padding:0 10px;">修改</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <hr />
                </b-col>
                <b-col cols="12">
                    <donut-chart-vue :chart-label="chartLabel" :chart-color="chartColor" :chart-data="chartData"
                        title="輪盤抽獎機率" label="總機會率" :triggerMap="trigger" />
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
                        <h3>獎品參數</h3>
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6" class="d-flex justify-content-end">
                        <b-button variant="primary" class="mr-1" @click="handleSubmit">儲存變更</b-button>
                    </b-col>
                </b-row>
            </div>

            <b-table ref="refRouletteListTable" class="position-relative" :items="fetchRoulettes" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
                empty-text="No matching records found" :sort-desc.sync="isSortDirDesc">
                <template #cell(update_winning_percentage)="data">
                    <b-input-group>
                        <b-form-input v-model="data.item.update_winning_percentage" type="number" placeholder=""
                            @input="updateWinningPercentage()" />
                    </b-input-group>
                </template>
                <template #cell(update_prize_value)="data">
                    <b-input-group>
                        <b-form-input v-model="data.item.update_prize_value" type="number" placeholder="" />
                    </b-input-group>
                </template>
                <template #cell(prize_type_id)="data">
                    {{ prizeTypeOptions && prizeTypeOptions.length > 0 && prizeTypeOptions.find(item => item.id ===
                        data.item.prize_type_id).name }}
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
                        <b-pagination v-model="currentPage" :total-rows="totalRoulettes" :per-page="perPage" first-number
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
    BFormInput,
    BPagination,
    BTable,
    BButton,
    BInputGroup,
    BAlert,
    BInputGroupAppend,
    BFormGroup
} from "bootstrap-vue";
import DonutChartVue from '../components/DonutChart.vue';
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import useRouletteList from "./useRouletteList"
import store from "@/store";

export default {
    data() {
        return {
            remark: "輪盤系數說明",
            chartLabel: ["收益加速器", "業績承諾卡", "每日收益", "推薦褔利"],
            chartColor: ['#939293', '#f8ba0b', '#3da1fe', '#60d936'],
            //chartData: [25, 25, 25, 25],
        }
    },
    methods: {
        handleSubmit() {
            this.$swal({
                title: "確定提交?",
                text: "提交後會使用新輪本數值",
                showCancelButton: true,
                confirmButtonText: "提交",
                cancelButtonText: "取消",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-outline-danger ml-1",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    this.showMessage('Fail', '還没連接API', 'HeartIcon', 'danger')
                    //連接API儲存數據
                 /*    store.dispatch("roulette/saveRoulette", this.rouleetes)
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
        },
        updateWinningPercentage() {
            //console.log(this.rouleetes)
        }
    },
    computed: {
        chartData() {
            let items = []
            items.push(0, 0, 0, 0)
            this.rouleetes.forEach(item => {
                if (item.prize_type_id) {
                    items[item.prize_type_id - 1] += Number(item.update_winning_percentage);
                }
            });
            //console.log(items)
            return items
        }
    },
    watch: {
        chartData(newVal, oldVal) {
            this.trigger = !this.trigger
        },
    },
    components: {
        BRow,
        BCol,
        BCard,
        BFormInput,
        BPagination,
        BTable,
        BButton,
        BInputGroup,
        DonutChartVue,
        BAlert,
        BInputGroupAppend,
        BFormGroup
    },
    setup() {
        const ROULETTE_STORE_MODULE_NAME = 'roulette'
        const coefficient = ref(1);
        const trigger = ref(false)

        if (!store.hasModule(ROULETTE_STORE_MODULE_NAME))
            store.registerModule(ROULETTE_STORE_MODULE_NAME, useRouletteList);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(ROULETTE_STORE_MODULE_NAME))
                store.unregisterModule(ROULETTE_STORE_MODULE_NAME);
        });

        

        const {
            fetchRoulettes,
            tableColumns,
            perPage,
            currentPage,
            totalRoulettes,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refRouletteListTable,
            prizeTypeOptions,
            rouleetes,
            showMessage,
            
        } = useRouletteList();

        return {
            trigger,
            fetchRoulettes,
            tableColumns,
            perPage,
            currentPage,
            totalRoulettes,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refRouletteListTable,
            prizeTypeOptions,
            rouleetes,
            showMessage,
            coefficient
        }
    }
}
</script>