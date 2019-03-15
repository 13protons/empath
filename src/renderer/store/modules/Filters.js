const files = require.context('@/assets/filters', false, /\.svg$/);
const filters = [];

const oParser = new DOMParser();

files.keys().forEach((key) => {
  console.log('found filter', key);
  const oDOM = oParser.parseFromString(files(key), 'application/xml');
  console.log('desc', oDOM.querySelector('desc').textContent);

  const f = Array.from(oDOM.querySelectorAll('filter')).map(item => ({
    id: item.id,
    description: item.querySelector('desc').textContent,
    label: item.querySelector('label').textContent
  }));

  const output = {
    title: oDOM.querySelector('title').textContent,
    description: oDOM.querySelector('desc').textContent,
    author: oDOM.querySelector('author').textContent,
    version: oDOM.querySelector('version').textContent,
    lastUpdated: oDOM.querySelector('updated').textContent,
    raw: files(key),
    controls: f
  };

  filters.push(output);
});

console.log('filters', filters);

const state = {
  list: filters,
  active: []
};

const getters = {
  list(state) {
    return state.list;
  },
  active(state) {
    return state.active;
  }
};

const mutations = {
  toggle(state, id) {
    const index = state.active.indexOf(id);
    if (index > -1) {
      state.active.splice(index, 1);
    } else {
      state.active.push(id);
    }
  },
  removeAll(state) {
    state.active = [];
  }
};

const actions = {
  toggle(context, id) {
    context.commit('toggle', id);
  },
  clear(context) {
    context.commit('removeAll');
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
