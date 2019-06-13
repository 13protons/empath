const path = require('path');
const cuid = require('cuid');
const fs = require('fs');
const files = fs.readdirSync(path.resolve(__static, './overlays'));

const overlays = files.filter(key => key.indexOf('.svg') > 0).map((key) => {
  const oParser = new DOMParser();

  const file = fs.readFileSync(path.resolve(__static, './overlays', key));
  const oDOM = oParser.parseFromString(file, 'application/xml');

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

const state = {
  overlays,
  activeOverlay: {},
};

const getters = {
  overlays(state) {
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
  },
  removeOverlays(context) {
    context.commit('setOverlay', -1000);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
