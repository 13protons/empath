const state = {
  url: 'http://github.com',
  loading: false,
  panelOpen: false
};

const getters = {
  url(state) {
    return state.url;
  },
  isLoading(state) {
    return state.loading;
  },
  isPanelOpen(state) {
    return state.panelOpen;
  }
};

const mutations = {
  visit(state, address) {
    state.url = address;
  },
  setLoadState(state, bool) {
    state.loading = bool;
  },
  setPanelState(state, bool) {
    state.panelOpen = bool;
  }
};

const actions = {
  visit(context, address) {
    // do something async
    console.log('got data', address);
    context.commit('visit', address);
  },
  toggleLoading(context) {
    context.commit('setLoadState', !context.state.loading);
  },
  startLoading(context) {
    context.commit('setLoadState', true);
  },
  stopLoading(context) {
    context.commit('setLoadState', false);
  },
  openPanel(context) {
    context.commit('setPanelState', true);
  },
  closePanel(context) {
    context.commit('setPanelState', false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
