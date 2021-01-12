<template>
    <div class="d-flex align-center flex-column col col-6">
        <div class="v-image v-responsive" style="height: 30px; width: 30px;">
            <div class="v-image__image v-image__image--cover d-flex align-center justify-center">
                <v-icon :color="color" size="20">{{icon}}</v-icon>
            </div>
            <div class="v-responsive__content rounded-icon opacity-icon lighten-3" :class="color"></div>
        </div>
        <span class="text-h6 mb-n1">{{value}}</span>
        <span class="text--secondary caption">{{ $t(`dashboard.summary.${summaryKey}`) }}</span>
    </div>
</template>

<script>
export default {
    name: 'dashboard-summary-card',
    props: {
        summaryKey: String,
        icon: String,
        color: String,
        value: String,
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

    .rounded-icon {
        border-radius: 50%;
    }
    .opacity-icon {
        opacity: 0.4;
    }
</style>
