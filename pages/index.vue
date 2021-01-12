<template>
    <v-row>
        <div class="col-sm-6 col-md-5 col-12">
            <dashboard-summary></dashboard-summary>
        </div>
        <div class="pt-0 pt-sm-3 col-sm-6 col-md-7 col-12">

        </div>
    </v-row>
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
