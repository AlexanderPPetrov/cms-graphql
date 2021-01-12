<template>
    <div class="col-md-6 col-12">
        <v-card>
            <v-card-title>
                <div>
                    {{ $t(`dashboard.summary.${titleKey}`) }}
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
            <div class="row no-gutters pb-5">
                <summary-item
                    v-for="item in summaryItems"
                    :key="item.summaryKey"
                    :summary-key="item.summaryKey"
                    :icon="item.icon"
                    :value="item.value"
                    :color="item.color"
                ></summary-item>
            </div>
        </v-card>
    </div>
</template>

<script>
import SummaryItem from './SummaryItem';

export default {
    name: 'dashboard-summary',
    props: {
        titleKey: String,
        summaryItems: Array,
    },
    components: {
        SummaryItem,
    },
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

<style scoped>
    .v-text-field.v-text-field--enclosed {
        flex: 0 0 120px;
    }
    .v-select__selection--comma {
        opacity: 0.5;
    }
</style>
