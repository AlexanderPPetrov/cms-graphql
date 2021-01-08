<template>
    <v-card>
        <v-card-title>
            <div>
                {{ $t('dashboard.summary.summary') }}
            </div>
            <v-spacer></v-spacer>
            <v-menu
                bottom
                left
                dense
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        dark
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <div>
                            {{ selected }}
                            <v-icon>mdi-dots-vertical</v-icon>
                        </div>
                    </v-btn>
                </template>
                <v-list dense class="pa-0">
                    <v-list-item
                        v-for="(item, i) in getItems"
                        :key="i"
                        link
                        @click="setSelectedItem"
                    >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    name: 'dashboard-summary',
    data() {
        return {
            selected: 'daily',
            items: ['daily', 'weekly', 'monthly'],
        }
    },
    created() {
        this.selected = this.$t('filters.daily')
    },
    computed: {
        getItems() {
            return this.items.map(item => this.$t(`filters.${item}`))
        }
    },
    methods: {
        setSelectedItem(e) {
            console.log(e);
        }
    }
};
</script>

<style>

</style>
