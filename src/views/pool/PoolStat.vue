<template>
    <b-card :title="pool.name" >

        <!--貨幣數據-->
        <b-row class="match-height">
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="TrendingUpIcon" :statistic="pool.sales_quantity"
                    statistic-title="配套出售數量" color="success" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="CpuIcon" :statistic="pool.total_quantity"
                    statistic-title="卡池總量" color="warning" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="RotateCwIcon" :statistic="pool.sale_quantity"
                    statistic-title="出售數量" color="danger" />
            </b-col>
            <b-col xl="3" md="3" sm="6" cols="6">
                <statistic-card-vertical class="statistic-box" icon="UsersIcon" :statistic="pool.remain_amount"
                    statistic-title="市場剩余數量" color="info" />
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    import {
    BRow,
    BCol,
    BCard,
} from "bootstrap-vue";
import StatisticCardVertical from "@core/components/statistics-cards/StatisticCardVertical.vue";

export default{
    components:{
        BRow,
        BCol,
        BCard,
        StatisticCardVertical
    },
    props:{
        pool:{
            type: Object,
            required: true
        }
    }
}
</script>