<template>
    <v-row>
        <dashboard-summary-card v-for="(item, index) in summary"
                                :key="index"
                                :title-key="item.titleKey"
                                :summary-items="item.summaryItems"
        >
        </dashboard-summary-card>
    </v-row>
</template>

<script>
import DashboardSummaryCard from "@/components/dashboard/DashboardSummaryCard";

export default {
    name: 'dashboard-summary',
    components: {
        DashboardSummaryCard,
    },
    data() {
        return {
            summary: [
                {
                    titleKey: 'users',
                    summaryItems: [
                        {
                            summaryKey: 'online_users',
                            icon: 'mdi-account-multiple-outline',
                            color: 'success',
                            value: '17',
                        },
                        {
                            summaryKey: 'registrations',
                            icon: 'mdi-account-multiple-outline',
                            color: 'warning',
                            value: '124',
                        }
                    ]
                },
                {
                    titleKey: 'balance',
                    summaryItems: [
                        {
                            summaryKey: 'successful_deposits',
                            icon: 'mdi-trending-up',
                            color: 'success',
                            value: '400.30 €',
                        },
                        {
                            summaryKey: 'successful_withdrawals',
                            icon: 'mdi-trending-down',
                            color: 'error',
                            value: '156.90 €',
                        }
                    ]
                },
                {
                    titleKey: 'balance',
                    summaryItems: [
                        {
                            summaryKey: 'successful_deposits',
                            icon: 'mdi-trending-up',
                            color: 'success',
                            value: '400.30 €',
                        },
                        {
                            summaryKey: 'successful_withdrawals',
                            icon: 'mdi-trending-down',
                            color: 'error',
                            value: '156.90 €',
                        }
                    ]
                },
                {
                    titleKey: 'balance',
                    summaryItems: [
                        {
                            summaryKey: 'successful_deposits',
                            icon: 'mdi-trending-up',
                            color: 'success',
                            value: '400.30 €',
                        },
                        {
                            summaryKey: 'successful_withdrawals',
                            icon: 'mdi-trending-down',
                            color: 'error',
                            value: '156.90 €',
                        }
                    ]
                }
            ]
        }
    },

};
</script>
