<template>
  <b-card id="donut-chart h-100">
    <b-card-title class="mb-1" style="font-weight:700;font-size: 1.07rem;margin-left:-1.5rem;"> {{title}}</b-card-title>
    <b-card-sub-title class="mb-2">
      {{ sub_title }}
    </b-card-sub-title>
    <vue-apex-charts
      type="donut"
      height="260"
      :options="donutChart.chartOptions"
      :series="donutChart.series"
      :key="`donutChart_${triggerMap}`"
    />
  </b-card>
</template>
<script>
import { BCard, BCardTitle, BCardSubTitle, BCardBody } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardSubTitle,
    BCardBody,
  },
  props:{
    title:{
      type: String,
      required: true
    },
    sub_title:{
      type: String,
      default: ''
    },
    lebal:{
      type: String,
      default: '總數值'
    },
    chartColor:{
      type: Array,
      required: true
      //Example ['#52B12C','#e3330b']
    },
    chartLabel:{
      type: Array,
      required: true
      //Example ["Online", "Offline"]
    },
    chartData:{
        type: Array,
        required: true,
        //Example [18,13]
        //let arr = []
        //arr.push(18,13)
    },
    triggerMap:{
        type: Boolean,
        required: true,
    }
  },
  watch: {
    chartData(newVal, oldVal) {
        this.resetData()
    },
  },
  methods:{
    resetData(){
        this.donutChart.series = this.chartData
    }
  },
  mounted(){
  /*    new ResizeObserver(() => this.resetData()).observe(
      document.querySelector("#donut-chart")
    );  */
  },
  data() {
    return {
      donutChart: {
        series: this.chartData,
        chartOptions: {
          legend: {
            show: true,
            position: "bottom",
            fontSize: "14px",
            fontFamily: "Montserrat",
          },
          colors: this.chartColor,
          fill: {
              type: 'gradient',
            },
          dataLabels: {
            enabled: true,
            formatter(val) {
              // eslint-disable-next-line radix
              return `${parseInt(val)}%`;
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "2rem",
                    fontFamily: "Montserrat",
                  },
                  value: {
                    fontSize: "1rem",
                    fontFamily: "Montserrat",
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)}`;
                    },
                  },
                  total: {
                    show: true,
                    fontSize: "1rem",
                     fontWeight: 'bold',
                     label: this.lebal,
                    /* formatter(val) {
                      return "31%";
                    }, */
                  },
                },
              },
            },
          },
          labels: this.chartLabel,
          responsive: [
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 260,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                chart: {
                  height: 300,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        name: {
                          fontSize: "1.5rem",
                        },
                        value: {
                          fontSize: "1rem",
                        },
                        total: {
                          fontSize: "1.5rem",
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: true,
                },
              },
            },
          ],
        },
      },
    };
  },
};
</script>

