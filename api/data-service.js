import networkClient from './network-client';

export default {

    // User actions
    getTestData(action, params, success, failure, done) {
        networkClient.post(action, 'testdata', params, success, failure, done);
    },

};
