<template>
    <v-card>
        <v-data-table
            :headers="getHeaders"
            :items="getUsers"
            sort-by="calories"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                    >
                        New Item
                    </v-btn>

                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'users-table',
    computed: {
        getUsers() {
            return this.$store.state.users.users;
        },
        getHeaders() {
            return [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: '_id',
                },
                {text: this.$t('user.email'), value: 'email'},
                {text: this.$t('user.firstName'), value: 'firstName'},
                {text: this.$t('user.lastName'), value: 'lastName'},
                {text: this.$t('user.roles'), value: 'roles'},
                {text: this.$t('user.createdAt'), value: 'createdAt'},
                {text: this.$t('user.lastLogin'), value: 'createdAt'},
            ]
        }
    },
    methods: {

    },
}
</script>

