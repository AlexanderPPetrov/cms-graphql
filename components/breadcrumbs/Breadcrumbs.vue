<template>
    <v-card class="mb-5">
        <v-breadcrumbs :items="getBreadcrumbItems">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item>
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </v-card>
</template>
<script>
import application from "@/mixins/application";

export default {
    name: 'breadcrumbs',
    mixins: [application],
    computed: {
        getBreadcrumbItems() {
            let items = [{
                text: this.$t(`drawer.${this.getActiveCategory(1).replace(/-/g, "_")}`)
            }]
            if (this.getActiveCategory(2)) {
                items.push({
                    text: this.$t(`drawer.${this.getActiveCategory(2).replace(/-/g, "_")}`)
                })
            }
            return items
        }
    }
}
</script>
