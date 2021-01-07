<template>
    <v-navigation-drawer :value="drawerOpened" fixed app>
        <v-list dense>
            <v-list-group
                v-for="item in drawerItems"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.icon"
                :append-icon="item.items && item.items.length ? 'mdi-menu-down' : null"
                no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(`drawer.${item.title}`)"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="child in item.items"
                    :key="child.title"
                    link
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(`drawer.${child.title}`)"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
    name: 'drawer',
    data() {
        return {
            drawerItems: [
                {
                    active: true,
                    title: 'dashboard',
                    icon: 'mdi-chart-box-outline',
                },
                {
                    title: 'crm',
                    icon: 'mdi-account-supervisor-outline',
                    items: [
                        {title: 'members_list'},
                    ],
                },
                {
                    title: 'payments',
                    icon: 'mdi-credit-card-check-outline',
                    items: [
                        {title: 'payments_list'},
                        {title: 'payment_methods'},
                    ],
                },
                {
                    title: 'sport',
                    icon: 'mdi-soccer',
                    items: [
                        {title: 'sports_bet_list'},
                        {title: 'results'},
                        {title: 'sport_management'},
                        {title: 'leagues_management'},
                        {title: 'bet_monitor'},
                        {title: 'leagues_favorites'},
                    ],
                },
                {
                    title: 'casino',
                    icon: 'mdi-dice-5-outline',
                    items: [
                        {title: 'casino_bet_list'},
                        {title: 'categories'},
                    ],
                },
                {
                    title: 'reports',
                    icon: 'mdi-file-chart-outline',
                    items: [
                        {title: 'sports_win_loss'},
                        {title: 'casino_win_loss'},
                        {title: 'daily_report'},
                        {title: 'monthly_indicator'},
                        {title: 'sports_report'},
                        {title: 'leagues_report'},
                        {title: 'markets_report'},
                        {title: 'casino_report'},
                    ],
                },
                {
                    title: 'cms',
                    icon: 'mdi-application-cog',
                    items: [
                        {title: 'tickers_list'},
                        {title: 'carousels_list'},
                        {title: 'content_list'},
                        {title: 'email_list'},
                        {title: 'promotions'},
                    ],
                },
                {
                    title: 'marketing',
                    icon: 'mdi-finance',
                    items: [
                        {title: 'coupon_list'},
                        {title: 'campaign_list'},
                        {title: 'report_overview_list'},
                        {title: 'report_free_bet_list'},
                        {title: 'coefficient_list'},
                        {title: 'content_page_list'},
                        {title: 'report_cashback'},
                    ],
                },
                {
                    title: 'antifraud',
                    icon: 'mdi-shield-account-variant-outline',
                    items: [
                        {title: 'linked_report'},
                        {title: 'anti_fraud_overall'},
                    ],
                },
            ],

        }
    },
    computed: {
        drawerOpened(){
            return this.$store.state.application.drawerOpened
        }
    }
}
</script>
