import actions from './actions';
import mutations from './mutations';
import sinon from 'sinon';

describe('actions', () => {
  it('countrySelected calls mutations with correct parameters', () => {
    const countrySelected = actions.map[actions.names.COUNTRY_SELECTED];
    const stubCommit = sinon.fake();
    const context = { commit: stubCommit };
    const newCountry = 'Germany';
    countrySelected(context, newCountry);
    const args = stubCommit.getCall(0).args[1];

    expect(args).toEqual(newCountry);
  });

  it('resetFilters dispatches actions to reset all filters', () => {
    const resetFilters = actions.map[actions.names.RESET_FILTERS];
    const stubDispatch = sinon.fake();
    const context = { dispatch: stubDispatch };
    resetFilters(context);
    const argsFirstCall = stubDispatch.getCall(0).args[0];
    const argsSecondCall = stubDispatch.getCall(1).args[0];

    expect(argsFirstCall).toEqual(actions.names.COUNTRY_SELECTED);
    expect(argsSecondCall).toEqual(actions.names.RANGE_SELECTED);
  });

  it('flushes old datapoints on start downloads generation', () => {
    const startRandomDownloads = actions.map[actions.names.START_RANDOM_DOWNLOADS];
    const stubCommit = sinon.fake();
    const context = { commit: stubCommit, state: { randomGeneratorConfig: { delay: 1000 } } };
    startRandomDownloads(context);
    const argsFirstCall = stubCommit.getCall(0).args[0];

    expect(argsFirstCall).toEqual(mutations.names.FLUSH_DATA_POINTS);
  });
});
