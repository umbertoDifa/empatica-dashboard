import mutations from './mutations'

describe('mutations', () => {
    const updateCountry = mutations.map[mutations.names.UPDATE_COUNTRY];

    it('Updates country with new one', () => {
        const state = { selectedCountry: '' };

        const newCountry = 'Germany';
        updateCountry(state, newCountry);

        expect(state.selectedCountry).toEqual(newCountry);
    })
})