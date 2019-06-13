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

ipcRenderer.on('sim-parkinsons', (event, activeFlag) => {
  function getRandomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function handleMouseMove() {
    console.log('mousemove');

    const ns = {};
    ns.cursorSource = '../../static/assets/arrow_cursor.png';
    ns.cursorRep = document.createElement('img');
    ns.cursorRep.src = ns.cursorSource;
    ns.cursorRep.style = "position:absolute;top:0;left:0;z-index:102;display:none;";
    ns.cursorX = 0;
    ns.cursorY = 0;
    ns.locked = false;

    if (!ns.locked) {

      let xshift = getRandomInt(-10, 10);
      let yshift = getRandomInt(-10, 10);

      ns.cursorX = event.clientX + xshift;
      ns.cursorY = event.clientY + yshift;

      ns.cursorRep.css('top', ns.cursorY);
      ns.cursorRep.css('left', ns.cursorX);
      ns.cursorRep.show();
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
    document.removeEventListener("mousemove", handleMouseMove);
  }
});
