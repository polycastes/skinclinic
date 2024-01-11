export const state = {
  medicines: [],
  ointments: [],
};

export const getLocalStorage = function () {
  console.log('getLocalStorage');
  //check if localStorage is empty
  if (!window.localStorage.length) return;

  let parseMeds, parseOint;
  // parse json object (medicine and ointments) from localStorage
  if (window.localStorage.getItem('Medicines') !== null)
    parseMeds = JSON.parse(window.localStorage.Medicines);
  console.log('parsed medicines');

  if (window.localStorage.getItem('Ointments') !== null)
    parseOint = JSON.parse(window.localStorage.Ointments);
  console.log('parsed ointments');

  console.log(parseMeds);
  console.log(parseMeds[0]);
  // console.log(parseOint[0]);

  // assign parsed data to state
  state.medicines = parseMeds;
  state.ointments = parseOint;

  return state;
};
