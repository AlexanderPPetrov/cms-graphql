import networkClient from '../plugins/nework-client';

export default {

    // User actions
    getTestData(action, params, success, failure, done) {
        console.log(networkClient);

        networkClient.post(action, 'testdata', params, success, failure, done);
    },

};
