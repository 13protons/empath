# Empath

## See the web through the eyes of others.

Empath is a simple web browser that uses `svg` filters to simulate visual imparements. 

### Example: Desaturate Colors

![Main](static/desaturate.jpg)

### Example: Mild Astigmatism

![Main](static/astigmatism.jpg)

![Main](static/nyt_14Mar2019.jpg)

### Effects defined as industry standard SVG filters

```xml
<svg>
  <title>Desaturate</title>
  <desc>Most colors are removed</desc>
  <metadata>
    <author>13protons</author>
    <version>0.0.1</version>
    <updated>2019-03-15T02:54:46.436Z</updated>
  </metadata>

  <defs>
    <filter id="desaturate"  x="0" y="0" width="100%" height="100%">
      <desc>Desaturate</desc>
      <metadata>
        <label>Remove Color</label>
      </metadata>

      <feColorMatrix in="SourceGraphic"
        type="saturate"
        values="0.2" />
    
    </filter>
  </defs>
</svg>
```

> Note: this project is in early stages. Drop a line if you'd like to help out!

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
