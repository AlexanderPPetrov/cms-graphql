import mutations from './mutation-types';
import actions from './action-types';

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        console.log('------>', this.$networkClient)
        const user = await this.$axios.$get('/getCurrentUser');
        commit(mutations.SET_CURRENT_USER, user)
    },
    [actions.AUTH_LOGIN]({commit}, params) {

        this.$networkClient.post(
            actions.AUTH_LOGIN, '/auth/login',
            params,
            (user) => {
                commit(mutations.SET_CURRENT_USER, user);
            },
            (error) => {
                console.log(error)
            })

    }
};
