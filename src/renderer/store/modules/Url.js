import { createValidUrlFromFragment } from './url-util';

const state = {
  url: 'http://github.com',
  loading: false,
  panelOpen: false,
  optionsOpen: false,
  devToolsOpen: false
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
  },
  areOptionsOpen(state) {
    return state.optionsOpen;
  },
  devToolsOpen(state) {
    return state.devToolsOpen;
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
  },
  setOptionsState(state, bool) {
    state.optionsOpen = bool;
  },
  setDevToolsState(state, bool) {
    state.devToolsOpen = bool;
  }
};

const actions = {
  visit(context, address) {
    // normalize url
    const urlParts = createValidUrlFromFragment(address);
    let url = address;
    if (urlParts.isSearch) {
      url = `https://duckduckgo.com/?q=${urlParts.query}`;
    } else {
      url = urlParts.normalized;
    }
    context.commit('visit', url);
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
  togglePanel(context) {
    context.commit('setPanelState', !context.state.panelOpen);
  },
  toggleOptions(context) {
    context.commit('setOptionsState', !context.state.optionsOpen);
  },
  toggleDevTools(context) {
    context.commit('setDevToolsState', !context.state.devToolsOpen);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

// if (isValidUrl(address)) {
//   // visit it! what are you waiting for?!
//   context.commit('visit', address);
// } else if (isValidUrl(normalized)) {
//   context.commit('visit', normalized);
// } else {
//   // if pre/post normalized urls are BOTH invalid, then search the web with pre normalized
//   context.commit('visit', `https://google.com/search?q=${encodeURI(address)}`);
// }
