// Get the ipcRenderer of electron
const {ipcRenderer} = require('electron');

ipcRenderer.on("set-volume",function(event,volume){
  try {
    const audioElems = document.getElementsByTagName('audio');
    const videoElems = document.getElementsByTagName('video');

    Array.prototype.slice.call(audioElems).forEach(elem => {
      elem.volume = volume;
    });

    Array.prototype.slice.call(videoElems).forEach(elem => {
      elem.volume = volume;
    });
  }
  catch(err) {
    // alert because I haven't figured out how to see the console yet
    alert(err);
  }
});

ipcRenderer.on("set-spinny",function(event){
  try {
    const audioElems = document.getElementsByTagName('div');
    const videoElems = document.getElementsByTagName('video');

    Array.prototype.slice.call(audioElems).forEach(elem => {
      elem.volume = volume;
    });

    Array.prototype.slice.call(videoElems).forEach(elem => {
      elem.volume = volume;
    });
  }
  catch(err) {
    // alert because I haven't figured out how to see the console yet
    alert(err);
  }
});