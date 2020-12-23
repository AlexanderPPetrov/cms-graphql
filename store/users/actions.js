import mutations from './mutation-types';
import actions from './action-types';

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const user = await this.$axios.$get('/auth/user');
        commit(mutations.SET_CURRENT_USER, user)
    },
    [actions.AUTH_LOGIN]({commit}, payload) {
        this.$api.post(
            actions.AUTH_LOGIN, '/auth/login',
            payload.data,
            user => {
                if(payload.success){
                    payload.success(user);
                }
                commit(mutations.SET_CURRENT_USER, user);
            })
    }
};
