import * as model from './model.js';
import view from './View.js';

const refreshAll = function () {
  view.renderViewAll(model.state);
  view.renderViewMedicine(model.state);
  view.renderViewOintment(model.state);
  view.renderWeeklyReport(model.state);
  view.renderAddStock(model.state);
  view.renderEditPrice(model.state);
  view.renderSellMedicine(model.state);
  view.renderDeleteMedicine(model.state);
};

const action = function (name, data) {
  switch (name) {
    case 'add-stock':
      model.addStock(data);
      view.resetAddStock();
      model.saveState(data);
      break;
    case 'edit-price':
      model.editPrice(data);
      view.resetAddStock();
      break;
    case 'sell-medicine':
      model.sellMedicine(data);
      view.resetSellMedicine();
      break;
    case 'new-medicine':
      model.newMedicine(data);
      view.resetNewMedicine();
      break;
    case 'delete-medicine':
      model.deleteMedicine(data);
      view.resetDeleteMedicine();
      break;
  }

  // refresh/update tables and computations
  refreshAll();

  // go back to home page (view-all)
  view.showViewAll();

  // save new modified state to localStorage
  model.saveState();
};

const saveBackup = function (type) {
  if (type === 'save-backup') {
    model.saveBackup();
  }

  // if (type === 'load-backup') {
  //   console.log('loading backup');
  //   model.loadBackup();
  // }
};

const loadBackup = async function (files) {
  await model.loadBackup(files[0]);

  view.resetFile();

  // refresh/update tables and computations
  refreshAll();

  // go back to home page (view-all)
  view.showViewAll();
};

const init = async function () {
  //load test data
  // model.loadTestData();

  // clear test data
  // window.localStorage.clear();

  //load data from local storage and push to model.state if it exists
  model.loadLocalStorage();

  // display view all & render all pages
  refreshAll();

  // initialize event handlers
  view.addHandlerToggleMenu();
  view.addHandlerMenuButtons(saveBackup);
  view.addHandlerFileChange(loadBackup);
  view.addHandlerSectionButtons(action);
  view.addHandlerSectionLoadData(model.state);
  view.addHandlerSectionInput(model.state);
};
init();
