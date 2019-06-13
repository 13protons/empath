const { ipcRenderer } = require('electron');

ipcRenderer.on('set-volume', (event, volume) => {
  try {
    const audioElems = document.getElementsByTagName('audio');
    const videoElems = document.getElementsByTagName('video');

    Array.prototype.slice.call(audioElems).forEach((elem) => {
      elem.volume = volume;
    });

    Array.prototype.slice.call(videoElems).forEach((elem) => {
      elem.volume = volume;
    });
  } catch (err) {
    // alert because I haven't figured out how to see the console yet
    alert(err);
  }
});

ipcRenderer.on('sim-parkinsons asdf', (event, activeFlag) => {
  function getRandomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function handleMouseMove(e) {
    const ns = {};
    // ns.cursorSource = '../../static/assets/arrow_cursor.png';
    ns.cursorSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzUlEQVR4XpWTT2iSYRzHP4Y6t7JLw4NCXRYrZl2adJ+jUVTEDuHuQUHsFgRBEEGNLalwM3UrijG0Fv1Z9Mc61CUiWKbnbeYke41OQk1998731+tlaLje7QNfntP3w4/f8zyIyHoeTM9omNPU2UYDtVrNOj0Tl6l79z1sjmaBpmmcPHEcp9NZiMTuBrYuWFujo6OdY0cH6OzclbgTnUxsSaDXdKqVCsvLeQaO+Nnb1RUYD0cKmxeIoKqr/P6zwsJiFq+3B19vr+d2aELCkZjHVIDoqKsqbXYbiFAsFnG5XPT3+wEK4+Fo4P8T6IZArQvs2I3YbDaq1TLtDgf+vr76chOhicizDQUiGAKNNqNQqZRxGOfbd+958vQ5r14nKZVKAKdowPrvDupTKMovvmYynB4cxNuznzfJZOxmcGwKAGD4/LmNdiCslMuk0hm9+EOZzeXz7Ovuxu12DwGphrQWWCwwP/+Fz58+nr0xNnIhnc7g3LGdgwe8O0dGg0OmtyBiQVGUucezjx4C37PfspMLi0sc9vnqzzxu+jGAQ8Ae1sEdCkdl7sVLuXT5yodWHSvNpGhGyeVy8Z+Ksvv6tatnaIEVE24FRy8CDiBLC/4C3kjgJkXCw9gAAAAASUVORK5CYII=';
    ns.cursorX = 0;
    ns.cursorY = 0;
    ns.locked = false;

    let img = document.getElementById('cursor_img');

    if (img) {
      ns.cursorRep = img;
    } else {
      ns.cursorRep = document.createElement('img');
      ns.cursorRep.id = 'cursor_img';
      ns.cursorRep.src = ns.cursorSource;
      ns.cursorRep.style = "position:absolute;top:0;left:0;z-index:102;display:none;";
    }

    if (!ns.locked) {

      let xshift = getRandomInt(-10, 10);
      let yshift = getRandomInt(-10, 10);

      ns.cursorX = e.clientX + xshift;
      ns.cursorY = e.clientY + yshift;

      ns.cursorRep.style.top = ns.cursorY;
      ns.cursorRep.style.left = ns.cursorX;
      ns.cursorRep.style.display = 'inline-block';
      document.body.append(ns.cursorRep);
      document.body.style.cursor = 'none';
    }
  }

  if (activeFlag) {
   try {
      document.addEventListener("mousemove", handleMouseMove);
    } catch (err) {
      console.log(err);
    }
  } else {
    alert('removing');
    document.getElementById('cursor_img').style.display = 'none';
    document.removeEventListener("mousemove", handleMouseMove);
  }
});
