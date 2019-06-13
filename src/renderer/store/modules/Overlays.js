const path = require('path');
const cuid = require('cuid');
const files = require.context('@/assets/overlays', false, /\.svg$/);

const overlays = files.keys().map((key) => {
  const oParser = new DOMParser();

  console.log('found overlay', key);
  const oDOM = oParser.parseFromString(files(key), 'application/xml');
  console.log('desc', oDOM.querySelector('desc').textContent);

  return {
    title: oDOM.querySelector('title').textContent,
    description: oDOM.querySelector('desc').textContent,
    author: oDOM.querySelector('author').textContent,
    version: oDOM.querySelector('version').textContent,
    lastUpdated: oDOM.querySelector('updated').textContent,
    url: path.resolve('/static/overlays', key),
    id: cuid()
  };
});

console.log('overlays', overlays);

const state = {
  overlays,
  activeOverlay: {},
};

const getters = {
  overlays(state) {
    console.log('retrieve state', state.overlays);
    return overlays;
  },
  activeOverlay(state) {
    return state.activeOverlay;
  }
};

const mutations = {
  setOverlay(state, id) {
    console.log('looking for', id);

    let found = false;
    overlays.forEach((data, index) => {
      if (id === data.id) {
        state.activeOverlay = data;
        found = true;
      }
    });
    if (!found) {
      console.log('didnt find. remove', id);

      state.activeOverlay = {};
    }
  }
};

const actions = {
  activate(context, id) {
    context.commit('setOverlay', id);
  },
  toggleOverlay(context, id) {
    console.log('trying to toggle overlay', id);
    if (context.state.activeOverlay.id && context.state.activeOverlay.id === id) {
      context.commit('setOverlay', -1000);
      console.log('remove overlay');
    } else {
      context.commit('setOverlay', id);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
