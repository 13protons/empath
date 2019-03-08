const files = require.context('@/assets/filters', false, /\.svg$/);
const filters = [];

var oParser = new DOMParser();

files.keys().forEach((key) => {
  console.log('found filter', key)
  var oDOM = oParser.parseFromString(files(key), "application/xml");
  console.log('desc', oDOM.querySelector('desc').textContent);

  var f = Array.from(oDOM.querySelectorAll('filter')).map(function(item){
    return {
      id: item.id,
      description: item.querySelector('desc').textContent,
      label: item.querySelector('label').textContent
    };
  })
  
  var output = {
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
  list: [],
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
