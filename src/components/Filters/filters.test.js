import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Filters from './Filters'
import VueMaterial from 'vue-material'
const localVue = createLocalVue()

localVue.use(Vuex);
localVue.use(VueMaterial);

describe('Actions.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {};
    store = new Vuex.Store({
      actions,
    });
  });

  it('dispatches "COUNTRY_SELECTED" when dropdown clicked', () => {
    actions.resetFilters = jest.fn();
    const wrapper = shallowMount(Filters, { store, localVue });
    const dropdown = wrapper.find('#reset-button');
    dropdown.trigger('click');
    actions.resetFilters();
    expect(actions.resetFilters).toHaveBeenCalled();
  });

});