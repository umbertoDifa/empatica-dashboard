
const names = {
    'COUNTRIES': 'COUNTRIES',
    'DATA_POINTS': 'DATA_POINTS',
    'FILTERED_DATA_POINTS': 'FILTERED_DATA_POINTS',
};

function getFilteredDataPoints(state, getters){
    return getters.DATA_POINTS.filter(dp => !state.selectedCountry || dp.country == state.selectedCountry)
}

export default {
    map: {
        [names.DATA_POINTS]: state => Object.values(state.downloads),
        [names.COUNTRIES]: state => new Set(Object.values(state.downloads).map(d => d.country)),
        [names.FILTERED_DATA_POINTS]: getFilteredDataPoints,
    },
    names,
}