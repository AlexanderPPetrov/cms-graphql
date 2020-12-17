import mutations from "./mutation-types";
import actions from "./action-types";
import dataService from "../../api/data-service";

export default {
    [actions.GET_TEST_DATA]({commit, state}, params) {
        dataService.getTestData(
            actions.GET_TEST_DATA,
            params,
            response => {
                commit(mutations.SET_TEST_DATA, response)
            },
            error => {
                console.log(error.message);
            },
        )
    },
};
