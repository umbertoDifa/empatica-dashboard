import mutations from './mutations';

describe('mutations', () => {
  it('Updates country with new one', () => {
    const updateCountry = mutations.map[mutations.names.UPDATE_COUNTRY];

    const state = { selectedCountry: '' };

    const newCountry = 'Germany';
    updateCountry(state, newCountry);

    expect(state.selectedCountry).toEqual(newCountry);
  });

  it('Updates app_id with new one', () => {
    const updateAppId = mutations.map[mutations.names.UPDATED_SELECTED_APP];

    const state = { appId: 'IOS' };

    const newAppId = 'MATE';
    updateAppId(state, newAppId);

    expect(state.appId).toEqual(newAppId);
  });

  it('Updates downloads with new datapoints', () => {
    const updateDownloads = mutations.map[mutations.names.UPDATE_DOWNLOADS];

    const state = { downloads: { id1: { lat: 30 } } };

    const newDownloads = { id2: { country: 'Italy' }, id3: { country: 'Germany' } };
    updateDownloads(state, newDownloads);

    expect(state.downloads).toEqual(newDownloads);
  });

  it('Updates range with correnct span', () => {
    const updateRange = mutations.map[mutations.names.UPDATE_RANGE];

    const state = { dateRange: { startDate: 100000, endDate: 100000000 } };

    const newRange = { startDate: 60, endDate: 60 };
    updateRange(state, newRange);

    expect(state.dateRange).toEqual(newRange);
  });

  it('Flushes the real time points', () => {
    const flushDataPoints = mutations.map[mutations.names.FLUSH_DATA_POINTS];

    const state = { lastDataPoint: [1, 2, 3] };

    flushDataPoints(state);

    expect(state.lastDataPoint).toEqual([]);
  });
});
