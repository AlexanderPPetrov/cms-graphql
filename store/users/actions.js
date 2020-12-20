import mutations from './mutation-types';
import actions from './action-types';

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const user = await this.$axios.$get('/getCurrentUser');
        commit(mutations.SET_CURRENT_USER, user)
    },
    [actions.AUTH_LOGIN]({commit}, data) {
        this.$api.post(
            actions.AUTH_LOGIN, '/auth/login',
            data,
            (user) => {
                commit(mutations.SET_CURRENT_USER, user);
            })
    }
};
