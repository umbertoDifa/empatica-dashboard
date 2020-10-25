import moment from 'moment'

const state = Object.freeze({
    downloads: {},
    selectedCountry:'WORLD',
    dateRange: {
        startDate: moment("2014-02-27T10:00:00"),
        endDate: moment(),
    },
});

export {
    state
}