<template>
    <v-navigation-drawer :value="drawerOpened" fixed app>
        <v-list dense>
            <v-list-group
                v-for="item in drawerItems"
                :key="item.navKey"
                :value="isActiveCategory(item.navKey)"
                :prepend-icon="item.icon"
                :append-icon="item.items && item.items.length ? 'mdi-menu-down' : null"
                no-action
                @click="parentOnClick(item)"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(`drawer.${item.navKey}`)"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="child in item.items"
                    :key="child.navKey"
                    link
                    :value="isActiveSubcategory(child.navKey)"
                    :to="getLink(item, child)" nuxt
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="$t(`drawer.${child.navKey}`)"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import application from "@/mixins/application";
    export default {
        mixins: [application],
        name: 'drawer',
        data() {
            return {
                drawerItems: [
                    {
                        active: true,
                        navKey: 'dashboard',
                        icon: 'mdi-chart-box-outline',
                    },
                    {
                        navKey: 'crm',
                        icon: 'mdi-account-supervisor-outline',
                        items: [
                            {navKey: 'members_list'},
                        ],
                    },
                    {
                        navKey: 'payments',
                        icon: 'mdi-credit-card-check-outline',
                        items: [
                            {navKey: 'payments_list'},
                            {navKey: 'payment_methods'},
                        ],
                    },
                    {
                        navKey: 'sport',
                        icon: 'mdi-soccer',
                        items: [
                            {navKey: 'sports_bet_list'},
                            {navKey: 'results'},
                            {navKey: 'sport_management'},
                            {navKey: 'leagues_management'},
                            {navKey: 'bet_monitor'},
                            {navKey: 'leagues_favorites'},
                        ],
                    },
                    {
                        navKey: 'casino',
                        icon: 'mdi-dice-5-outline',
                        items: [
                            {navKey: 'casino_bet_list'},
                            {navKey: 'categories'},
                        ],
                    },
                    {
                        navKey: 'reports',
                        icon: 'mdi-file-chart-outline',
                        items: [
                            {navKey: 'sports_win_loss'},
                            {navKey: 'casino_win_loss'},
                            {navKey: 'daily_report'},
                            {navKey: 'monthly_indicator'},
                            {navKey: 'sports_report'},
                            {navKey: 'leagues_report'},
                            {navKey: 'markets_report'},
                            {navKey: 'casino_report'},
                        ],
                    },
                    {
                        navKey: 'cms',
                        icon: 'mdi-application-cog',
                        items: [
                            {navKey: 'tickers_list'},
                            {navKey: 'carousels_list'},
                            {navKey: 'content_list'},
                            {navKey: 'email_list'},
                            {navKey: 'promotions'},
                        ],
                    },
                    {
                        navKey: 'marketing',
                        icon: 'mdi-finance',
                        items: [
                            {navKey: 'coupon_list'},
                            {navKey: 'campaign_list'},
                            {navKey: 'report_overview_list'},
                            {navKey: 'report_free_bet_list'},
                            {navKey: 'coefficient_list'},
                            {navKey: 'content_page_list'},
                            {navKey: 'report_cashback'},
                        ],
                    },
                    {
                        navKey: 'antifraud',
                        icon: 'mdi-shield-account-variant-outline',
                        items: [
                            {navKey: 'linked_report'},
                            {navKey: 'anti_fraud_overall'},
                        ],
                    },
                ],

            }
        },
        computed: {
            drawerOpened() {
                return this.$store.state.application.drawerOpened
            },
        },
        methods: {
            getLink(item, child) {
                const parentLink = item.navKey;
                const childLink = child.navKey.replace(/_/g, "-");
                return `/${parentLink}/${childLink}`
            },
            parentOnClick(item) {
                if (item.navKey === 'dashboard') {
                    this.$router.push(this.localePath({name: "index"}));
                }
            },
            isActiveCategory(navKey) {
                return navKey === this.getActiveCategory(1);
            },
            isActiveSubcategory(navKey){
                return navKey === this.getActiveCategory(2);
            }
        }
    }
</script>
