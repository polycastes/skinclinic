import * as model from './model.js';
import view from './View.js';

const openPanel = function (btn) {
  switch (btn) {
    case 'View All':
      // open view all article
      view.switchArticle('view-all', model.state.currentPage);
      model.state.currentPage = 'view-all';

      // display tables
      view.displayAll(model.state);

      // close menu
      view.toggleMenu();
      break;
    case 'View Medicines':
      // open view medicines article
      view.switchArticle('view-medicines', model.state.currentPage);
      model.state.currentPage = 'view-medicines';

      // display tables
      view.displayMedicines(model.state.Medicines, model.state.currentPage);

      // close menu
      view.toggleMenu();
      break;
    case 'View Ointments':
      // open view ointments article
      view.switchArticle('view-ointments', model.state.currentPage);
      model.state.currentPage = 'view-ointments';

      // display tables
      view.displayOintments(model.state.Ointments, model.state.currentPage);

      // close menu
      view.toggleMenu();
      break;
    case 'View Report':
      break;
    case 'Sell Medicine':
      break;
    case 'Add Stick':
      break;
    case 'Sell Medicine':
      break;
    case 'Load Backup':
      model.loadBackup();
      break;
    case 'Save Backup':
      model.saveBackup();
      break;
  }
};

const init = function () {
  console.log('init');
  // add event handlers
  view.addHandlerMenu();
  view.addHandlerMenuButtons(openPanel);

  // get localStorage data and save to state
  model.getLocalStorage();

  //display main page (view all)
  view.displayAll(model.state);
};

init();
