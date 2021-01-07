import mutations from './mutation-types';

export default {
    [mutations.SET_DRAWER_OPENED](state, value) {
        state.drawerOpened = value;
    },
    [mutations.SET_BREADCRUMBS](state, value) {
        state.breadcrumbs = value;
    },
};
