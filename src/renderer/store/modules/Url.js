const normalizeUrl = require('normalize-url');
const {parse} = require('tldjs');

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
    // normalize url
    let url = createValidUrlFromFragment(address);
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
  openPanel(context) {
    context.commit('setPanelState', true);
  },
  closePanel(context) {
    context.commit('setPanelState', false);
  },
  clearHistory() { }
};

export default {
  state,
  getters,
  mutations,
  actions,
};

function isValidUrl(fragment) {
  try {
    
    let url = new URL(fragment);
  } catch(e) {
    console.log('invalid fragment: ', fragment)
    return false;
  }

  console.log('ok fragment: ', fragment)
  return true;
}

function createValidUrlFromFragment(fragment) {

  let candidate = parse(fragment);
  console.log('parsed: ', candidate);
  if ((candidate.tldExists === false || candidate.domain === null) && candidate.isIp === false) {
    // search for it
    console.log('should search for ', fragment)
    return `https://google.com/search?q=${encodeURI(fragment)}`
  } 
  return normalizeUrl(fragment);

}

// if (isValidUrl(address)) {
//   // visit it! what are you waiting for?!
//   context.commit('visit', address);
// } else if (isValidUrl(normalized)) {
//   context.commit('visit', normalized);
// } else {
//   // if pre/post normalized urls are BOTH invalid, then search the web with pre normalized
//   context.commit('visit', `https://google.com/search?q=${encodeURI(address)}`);
// }