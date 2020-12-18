import mutations from './mutation-types';
import actions from './action-types';

export default {
    async [actions.GET_TEST_DATA] ({ commit }) {
        const response = await this.$axios.$get('/testData');
        commit('SET_TEST_DATA', response.firstName)
    }
};
