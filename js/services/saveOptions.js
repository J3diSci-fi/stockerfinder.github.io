const OPTIONS_KEY = 'game_options';

function getOptions() {
  const options = localStorage.getItem(OPTIONS_KEY);
  return options ? JSON.parse(options) : {
    musicVolume: 50,
    helpMode: false,
    daltonicMode: false,
    language: 'pt',
  };
}

function setOptions(options) {
  localStorage.setItem(OPTIONS_KEY, JSON.stringify(options));
}

export default {
  getOptions,
  setOptions
}; 