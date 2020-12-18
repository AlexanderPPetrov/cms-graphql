import mutations from './mutation-types';

export default {
    [mutations.SET_CURRENT_USER](state, value) {
        state.currentUser = value;
    },
};
