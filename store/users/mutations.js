import mutations from './mutation-types';

export default {
    [mutations.SET_TEST_DATA](state, value) {
        state.firstName = value;
        console.log(state);
    },
};
