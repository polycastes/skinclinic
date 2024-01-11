import * as model from './model.js';
import view from './View.js';

const init = function () {
  console.log('init');
  // add event handlers
  view.addHandlerMenu();

  model.getLocalStorage();

  view.displayAll(model.state);
};

init();
