<template>
    <v-card>
        <v-card-title>
            <div>
                {{ $t('dashboard.summary.summary') }}
            </div>
            <v-spacer></v-spacer>
            <v-select
                :items="getItems"
                solo
                dense
                flat
                hide-details
                v-model="selected"
            ></v-select>
        </v-card-title>
        <div class="row no-gutters">
            <div class="d-flex align-center flex-column col col-6">

            </div>
        </div>
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
            console.log(this.items.map(item => this.$t(`filters.${item}`)))
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

<style scoped>
    .v-text-field.v-text-field--enclosed {
        flex: 0 0 120px;
    }
</style>
