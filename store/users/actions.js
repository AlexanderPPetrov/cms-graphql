import mutations from './mutation-types';
import actions from './action-types';
import {user, users, currentUser} from "~/apollo/queries/user.gql";
import login from "~/apollo/mutations/login.gql";

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const response = await this.$apollo.query(
            actions.GET_CURRENT_USER,
            {
                query: currentUser,
                fetchPolicy: 'no-cache',
            });
        if (response) {
            return response.data.currentUser
        }
        return null
    },
    async [actions.GET_USERS]({commit}) {
        const response = await this.$apollo.query(
            actions.GET_USERS,
            {
                query: users,
                fetchPolicy: "no-cache",
            });
        if (response) {
            commit(mutations.SET_USERS, response.data.users);
        }
    },
    async [actions.AUTH_LOGIN]({commit}, payload) {
        const response = await this.$apollo.mutate(
            actions.AUTH_LOGIN,
            {
                mutation: login,
                variables: payload.data
            })

        if (response) {
            console.log('response', response);
            await this.$apolloHelpers.onLogin(response.data.login, undefined, {expires: 1})
            if (payload.success) {
                payload.success(response)
            }
        }

    }
};
