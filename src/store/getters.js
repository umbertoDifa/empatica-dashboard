
const names = {
    'COUNTRIES': 'COUNTRIES',
    'DATA_POINTS': 'DATA_POINTS',
    'FILTERED_DATA_POINTS': 'FILTERED_DATA_POINTS',
};

const worldCountry = 'WORLD';

function getFilteredDataPoints(state, getters){
    return getters.DATA_POINTS.filter(dp => !state.selectedCountry 
        || state.selectedCountry == worldCountry 
        || dp.country == state.selectedCountry)
}

function getCountries(state){
    const s = new Set(Object.values(state.downloads).map(d => d.country));
    s.add(worldCountry);
    return s;
}

export default {
    map: {
        [names.DATA_POINTS]: state => Object.values(state.downloads),
        [names.COUNTRIES]: getCountries,
        [names.FILTERED_DATA_POINTS]: getFilteredDataPoints,
    },
    names,
}