<template>
    <div>
        <b-card title="項目數據統計">
            <b-row>
                <b-col cols="12">
                    <hr />
                    <h4>動態</h4>
                </b-col>
                <b-col cols="12" md="12">
                    <b-table
                        class="position-relative"
                        :items="fetchDynamicData"
                        responsive
                        :fields="tableDynamicColumns"
                        empty-text="No matching records found"
                    >
                    </b-table>
                </b-col>
                <b-col cols="12">
                    <hr />
                    <h4>靜態</h4>
                </b-col>
                <b-col cols="12" md="12">
                    <b-table
                        class="position-relative"
                        :items="fetchStaticData"
                        responsive
                        :fields="tableStaticColumns"
                        empty-text="No matching records found"
                    >
                    </b-table>
                </b-col>
                <b-col cols="12">
                    <hr />
                    <h4>今日排行</h4>
                </b-col>
                <b-col cols="12" md="12">
                    <b-table
                        class="position-relative"
                        :items="fetchStatistics"
                        responsive
                        :fields="tableColumns"
                        empty-text="No matching records found"
                    >
                    </b-table>
                    </b-col>
            </b-row>
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
    BAlert
} from "bootstrap-vue";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import store from "@/store";
import useStatisticList from "./useStatisticList"
import statisticStoreModule from "./statisticStoreModule";

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BFormInput,
        BPagination,
        BTable,
        BButton,
        BInputGroup,
        BAlert
    },
    data() {
        return {



        }
    },
    setup() {
        const STATISTIC_STORE_MODULE_NAME = 'statistic';

        if (!store.hasModule(STATISTIC_STORE_MODULE_NAME))
            store.registerModule(STATISTIC_STORE_MODULE_NAME, statisticStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(STATISTIC_STORE_MODULE_NAME))
                store.unregisterModule(STATISTIC_STORE_MODULE_NAME);
        });

        const {
            fetchStatistics,
            tableColumns,
            perPage,
            currentPage,
            totalStatistics,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refStatisticListTable,
            fetchDynamicData,
            fetchStaticData,
            tableDynamicColumns,
            tableStaticColumns,
            showMessage,
            dynamicData,
            staticData
        } = useStatisticList();


        return {
            fetchStatistics,
            tableColumns,
            perPage,
            currentPage,
            totalStatistics,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refetchData,
            refStatisticListTable,
            fetchDynamicData,
            fetchStaticData,
            tableDynamicColumns,
            tableStaticColumns,
            showMessage,
            dynamicData,
            staticData
        }
    }
}
</script>