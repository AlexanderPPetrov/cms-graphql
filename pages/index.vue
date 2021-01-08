<template>
    <div>
        <v-row>
            <div class="col-sm-6 col-md-5 col-12">
                <dashboard-summary></dashboard-summary>
            </div>
        </v-row>
    </div>
</template>

<script>
import DashboardSummary from "@/components/dashboard/DashboardSummary";

export default {
    components: {
        DashboardSummary,
    }
};
</script>

<style>

</style>
