import mutations from './mutation-types';
import actions from './action-types';
import getUser from "~/apollo/queries/user.gql";
import login from "~/apollo/mutations/login.gql";

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const apollo = this.app.apolloProvider.defaultClient;
        const response = await apollo
            .query({
                query: getUser,
                variables: {
                    _id: '5fddaaf8c6a1ce4f0c385dc1'
                }
            });
        commit(mutations.SET_CURRENT_USER, response.data.user)
    },
    async [actions.AUTH_LOGIN]({commit}, payload) {
        const apollo = this.app.apolloProvider.defaultClient;
        try {
            const response = await apollo.mutate(
                {
                    mutation: login,
                    variables: payload.data
                })
            await this.$apolloHelpers.onLogin(response.data.login).then(() => {
                if(payload.success){
                    payload.success(response)
                }
            })

        } catch (e) {
            console.error(e)
        }

    }
};
