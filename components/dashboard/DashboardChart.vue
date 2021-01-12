<template>
    <v-row>
        <div class="col">
            <v-card>
                <v-card-title>
                    <div>
                        {{ $t('dashboard.summary.summary') }}
                    </div>
                </v-card-title>
                <v-card-text class="pa-5 pt-0 pb-0">
                    <div class="row no-gutters">
                        <div class="my-auto col col-12">
                            <client-only>
                                <apexchart type="line" height="350" :options="getChartOptions"
                                           :series="series"></apexchart>
                            </client-only>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </v-row>
</template>
<script>

export default {
    name: 'dashboard-chart',
    data() {
        return {
            series: [
                {
                    name: "Session Duration",
                    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
                },
                {
                    name: "Page Views",
                    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
                },
                {
                    name: 'Total Visits',
                    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
                }
            ],
        }
    },
    computed: {
        getChartOptions(){
            return {
                chart: {
                    height: 350,
                        type: 'line',
                        foreColor: this.$vuetify.theme.dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                        zoom: {
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [2, 1, 2],
                        curve: 'straight',
                        dashArray: [0, 8, 5]
                },
                legend: {
                    tooltipHoverFormatter: function (val, opts) {
                        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                    }
                },
                markers: {
                    size: 0,
                        hover: {
                        sizeOffset: 6
                    }
                },
                xaxis: {
                    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                        '10 Jan', '11 Jan', '12 Jan'
                    ],
                },
                tooltip: {
                    theme: this.$vuetify.theme.dark ? 'dark' : 'light',
                    y: [
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " (mins)"
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " per session"
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val;
                                }
                            }
                        }
                    ]
                },
                grid: {
                    borderColor: 'transparent',
                }
            }
        }
    }

};
</script>
