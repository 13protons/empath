const state = {
  url: 'http://github.com'
};

const getters = {
  url(state) {
    return state.url;
  }
};

const mutations = {
  visit(state, address) {
    console.log('chaing url', address);
    state.url = address;
  }
};

const actions = {
  visit(context, address) {
    // do something async
    console.log('got data', address);
    context.commit('visit', address);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
