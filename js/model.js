import * as util from './util.js';

export const state = {
  Medicines: [],
  Ointments: [],
  currentPage: 'view-all',
  currentModal: '',
};

export const getLocalStorage = function () {
  //check if localStorage is empty
  if (!window.localStorage.length) return;

  let parseMeds, parseOint;
  // parse json object (medicine and ointments) from localStorage
  if (window.localStorage.getItem('Medicines') !== null)
    parseMeds = JSON.parse(window.localStorage.Medicines);

  if (window.localStorage.getItem('Ointments') !== null)
    parseOint = JSON.parse(window.localStorage.Ointments);

  // assign parsed data to state
  state.Medicines = parseMeds;
  state.Ointments = parseOint;

  return state;
};

export const saveBackup = function () {
  // get required data from state
  const data = {
    Medicines: state.Medicines,
    Ointments: state.Ointments,
  };

  // make file
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const date = new Date();
  const filename = `inventory backup ${util.formatTwoDigits(
    date.getMonth() + 1
  )}-${util.formatTwoDigits(date.getDate())}-${date.getFullYear()}.json`;
  const file = new File([blob], filename, { type: blob.type });

  // create link to download file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();

  // clean memory
  URL.revokeObjectURL(link.href);
};

export const loadBackup = async function (files) {
  console.log('load');

  // clear local storage and state
  window.localStorage.clear();
  state.Medicines = [];

  // read file
  const file = files[0];
  const blob = new Blob([file], { type: file.type });
  const data = JSON.parse(await blob.text());
  console.log(data);

  // save data to local storage
  let medicineStr = '[';
  data.Medicines.forEach((el, i) => {
    medicineStr += JSON.stringify(el);
    if (i < data.Medicines.length - 1) medicineStr += ',';
  });
  medicineStr += ']';

  let ointmentStr = '[';
  data.Ointments.forEach((el, i) => {
    ointmentStr += JSON.stringify(el);
    if (i < data.Ointments.length - 1) ointmentStr += ',';
  });
  ointmentStr += ']';

  window.localStorage.setItem('Medicines', medicineStr);
  window.localStorage.setItem('Ointments', ointmentStr);

  // add data to state
  state.Medicines = data.Medicines;
  state.Ointments = data.Ointments;
};
