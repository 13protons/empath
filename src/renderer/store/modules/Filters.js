const files = require.context('@/assets/filters', false, /\.svg$/);
const filters = [];

const oParser = new DOMParser();

files.keys().forEach((key) => {
  console.log('found filter', key);
  const oDOM = oParser.parseFromString(files(key), 'application/xml');
  console.log('desc', oDOM.querySelector('desc').textContent);

  const f = Array.from(oDOM.querySelectorAll('filter')).map((item) => {
    return {
      id: item.id,
      description: item.querySelector('desc').textContent,
      label: item.querySelector('label').textContent
    };
  })

  const output = {
    title: oDOM.querySelector('title').textContent,
    description: oDOM.querySelector('desc').textContent,
    author: oDOM.querySelector('author').textContent,
    version: oDOM.querySelector('version').textContent,
    lastUpdated: oDOM.querySelector('updated').textContent,
    raw: files(key),
    controls: f
  }

  filters.push(output);
});

const state = {
  list: filters,
  active: []
};

const getters = {
  active(state) {
    return state.url;
  }
};

const mutations = {
  enable(state, address) {
    state.url = address;
  },
  disable(state, bool) {
    state.loading = bool;
  }
};

const actions = {
  
};

export default {
  state,
  getters,
  mutations,
  actions,
};
