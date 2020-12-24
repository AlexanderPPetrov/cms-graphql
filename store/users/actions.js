import mutations from './mutation-types';
import actions from './action-types';
import getUser from "~/apollo/queries/user.gql";
export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const clientApollo = this.app.apolloProvider.defaultClient;
        const response = await clientApollo
            .query({
                query: getUser,
                variables: {
                    _id: '5fddaaf8c6a1ce4f0c385dc1'
                }
            });
        commit(mutations.SET_CURRENT_USER, response.data.user)
    },
    [actions.AUTH_LOGIN]({commit}, payload) {
        const clientApollo = this.app.apolloProvider.defaultClient;
        return new Promise((resolve, reject) => {
            clientApollo
                .query({
                    query: getUser,
                    variables: {
                        _id: '5fddaaf8c6a1ce4f0c385dc1'
                    }
                })
                .then(resp => {
                    commit("set_user", resp.data.user);
                    resolve(resp);
                })
                .catch(err => {
                    resolve(err);
                });
        });

    }
};
