import networkClient from './network-client';

export default {
    // Application actions
    getRegistrationFormVars(action, params, success, failure) {
        networkClient.post(action, 'index/operation/getRegistrationFormVars', params, success, failure);
    },

    // User actions
    registerUser(action, params, success, failure, done) {
        networkClient.post(action, 'index/operation/register', params, success, failure, done);
    },
    checkForAvailableWallets(action, params, success, failure, done) {
        networkClient.post(action, 'wallets/operation/getAvailable', params, success, failure, done);
    },
    getMemberBalance(action, params, success, failure, done) {
        networkClient.post(action, `${Config.CONTROLLER}/operation/getMemberBalance`, params, success, failure, done);
    },
    getHeaderIndicators(action, params, success, failure, done) {
        networkClient.post(action, `${Config.CONTROLLER}/operation/updateHeaderIndicatorsV2`, params, success, failure, done);
    },
    getGamesByArea(action, params, success, failure, done) {
        networkClient.post(action, `casino/operation/getGamesByArea`, params, success, failure, done);
    },
    getActiveCouponCodes(action, params, success, failure, done) {
        networkClient.get(action, `my/operation/getCoupons`, params, success, failure, done);
    },
    getMemberSessionId(action, params, success, failure, done) {
        networkClient.get(action, `my/operation/getSession`, params, success, failure, done);
    },

    // Sport actions
    getTeamsLogos(action, params, success, failure) {
        networkClient.post(action, 'euro/operation/getTeamStatisticData', params, success, failure);
    },
    getEventCategories(action, params, success, failure) {
        networkClient.post(action, 'sport-settings/operation/getEventCategories', params, success, failure);
    },
    getOutrights(action, params, success, failure) {
        networkClient.post(action, 'euro/operation/getOutrights', params, success, failure);
    },
    getLiveStreamData(action, params, success, failure){
        networkClient.post(action, `${Config.LAST_VIEW == 'european' ? 'euro' : 'sport'}/operation/getLiveStreamingData`, params, success, failure);
    },

    // Asian league filters
    getFilterLeagues(action, params, success, failure){
        networkClient.post(action, 'sport/operation/getFilter', params, success, failure);
    },
    setLeagueFilter(action, params, success, failure){
        networkClient.post(action, 'sport/operation/setLeagueFilter', params, success, failure);
    },

    // Euro actions
    getHighlighted(action, params, success, failure, repeatTime, executeInitially){
        networkClient.get(action, 'euro/operation/getHighlighted', params, success, failure, null, repeatTime, executeInitially);
    },
    getEuroPrematchMenu(action, params, success, failure){
        networkClient.get(action, 'euro/operation/getPrematchMenu', params, success, failure);
    },
    getEuroHomePageCarousel(action, params, success, failure, repeatTime, executeInitially){
        networkClient.get(action, 'euro/operation/getHomePageCarousel', params, success, failure,null, repeatTime, executeInitially);
    },
    getAvailableMarketsList(action, params, success, failure, repeatTime, executeInitially) {
        networkClient.post(action, 'euro/operation/getAvailableMarketsList', params, success, failure,null, repeatTime, executeInitially);
    },
    getEuroLeagueOutrights(action, params, success, failure){
        networkClient.post(action, 'euro/operation/getEuroLeague', params, success, failure);
    },

    //Casino actions
    getCasinoCategory(action, params, success, failure){
        networkClient.get(action, 'casino/operation/getCasinoCategory', params, success, failure)
    },
    getCasinoCarousel(action, params, success, failure){
        networkClient.get(action, 'casino/operation/getCarouselByKey', params, success, failure)
    },
    getCasinoGameUrl(action, params, success, failure){
        networkClient.get(action, 'casino/operation/play', params, success, failure)
    },
    getCasinoBanners(action, params, success, failure){
        networkClient.get(action, 'casino/operation/getBanners', params, success, failure)
    },
};