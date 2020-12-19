export default {
    //TODO needs refactoring. We should represent in another way...
    roomExclusionMap: {
        getESportsData: ['getVueLeagueOdds', 'getVueEuroHome', 'getVueEuroSport'],
        getVueLeagueOdds: ['getVueEuroHome', 'getESportsData', 'getVueEuroSport'],
        getVueEuroHome: ['getVueLeagueOdds', 'getESportsData', 'getVueEuroSport'],
        getVueEuroSport: ['getVueLeagueOdds', 'getESportsData', 'getVueEuroHome'],
    },
};