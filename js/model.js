export const state = {
  medicines: [],
  ointments: [],
  currentPage: 'view-all',
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
  state.medicines = parseMeds;
  state.ointments = parseOint;

  return state;
};
