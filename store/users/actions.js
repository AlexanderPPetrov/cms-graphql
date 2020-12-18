import mutations from './mutation-types';
import actions from './action-types';

export default {
    async [actions.GET_CURRENT_USER]({commit}) {
        const user = await this.$axios.$get('/getCurrentUser');
        commit('SET_CURRENT_USER', user)
    }
};
