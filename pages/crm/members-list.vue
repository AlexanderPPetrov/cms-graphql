<template>
    <users-table></users-table>
</template>

<script>
import actions from '../../store/users/action-types'
import UsersTable from "@/components/crm/UsersTable";
export default {
    components: {
        UsersTable,
    },
    async fetch({ store }){
        await store.dispatch(`users/${actions.GET_USERS}`);
    },
    computed: {
        getUsers(){
            return this.$store.state.users.users;
        }
    },
};
</script>
