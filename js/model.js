import * as util from './util.js';

export const state = {
  Medicines: [],
  Ointments: [],
  Sold: [],
};

export const saveState = function () {
  window.localStorage.setItem('Medicines', JSON.stringify(state.Medicines));
  window.localStorage.setItem('Ointments', JSON.stringify(state.Ointments));
  window.localStorage.setItem('Sold', JSON.stringify(state.Sold));
};

export const loadLocalStorage = function () {
  if (window.localStorage.length === 0) return;

  // parse json string from localstorage
  const parseMeds = JSON.parse(window.localStorage.getItem('Medicines'));

  // push element to state
  parseMeds.forEach((el) => state.Medicines.push(el));

  // parse json string from localstorage
  const parseOints = JSON.parse(window.localStorage.getItem('Ointments'));

  // push element to state
  parseOints.forEach((el) => state.Ointments.push(el));

  // parse json string from localstorage
  const parseSold = JSON.parse(window.localStorage.getItem('Sold'));

  // push element to state
  parseSold.forEach((el) => state.Sold.push(el));
};

export const saveBackup = function () {
  // nothing to save
  if (
    state.Medicines.length === 0 &&
    state.Ointments.length === 0 &&
    state.Sold.length === 0
  )
    return;

  // get required data from state
  const data = {
    Medicines: state.Medicines,
    Ointments: state.Ointments,
    Sold: state.Sold,
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
  // clear local storage and state
  window.localStorage.clear();
  state.Medicines = [];
  state.Ointments = [];
  state.Sold = [];

  // read file
  const file = files;
  const blob = new Blob([file], { type: file.type });
  const data = JSON.parse(await blob.text());

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

  let soldStr = '[';
  data.Sold.forEach((el, i) => {
    soldStr += JSON.stringify(el);
    if (i < data.Sold.length - 1) soldStr += ',';
  });
  soldStr += ']';

  window.localStorage.setItem('Medicines', medicineStr);
  window.localStorage.setItem('Ointments', ointmentStr);
  window.localStorage.setItem('Sold', soldStr);

  // add data to state
  state.Medicines = data.Medicines;
  state.Ointments = data.Ointments;
  state.Sold = data.Sold;
};

export const addStock = function (data) {
  state.Medicines[data.index].quantity += data.quantity;
  state.Medicines[data.index].total =
    state.Medicines[data.index].quantity *
    state.Medicines[data.index].sellingPrice;
};

export const editPrice = function (data) {
  state.Medicines[data.index].unitPrice = data.newUnitPrice;
  state.Medicines[data.index].sellingPrice = data.newSellingPrice;
  state.Medicines[data.index].total =
    state.Medicines[data.index].quantity *
    state.Medicines[data.index].sellingPrice;
};

export const sellMedicine = function (data) {
  // subtract quantity from state
  state.Medicines[data.index].quantity -= data.quantity;

  // compute new total
  state.Medicines[data.index].total =
    state.Medicines[data.index].quantity *
    state.Medicines[data.index].sellingPrice;

  // add sold to state.Sold
  state.Sold.push({
    name: state.Medicines[data.index].name,
    unitPrice: state.Medicines[data.index].unitPrice,
    sellingPrice: state.Medicines[data.index].sellingPrice,
    quantity: data.quantity,
    dateSold: Date.now(),
  });
};

export const newMedicine = function (data) {
  state.Medicines.push({
    name: data.name,
    unitPrice: data.unitPrice,
    quantity: data.quantity,
    sellingPrice: data.sellingPrice,
    total: data.total,
  });

  //sort after push
  state.Medicines.sort((a, b) => a.name.localeCompare(b.name));
};

export const deleteMedicine = function (data) {
  state.Medicines.splice(data.index, 1);
};

// for testing puropses only
export const testData = {
  Medicines: [
    {
      name: 'Aklief',
      unitPrice: '2184.75 (2427.50)',
      quantity: 5,
      sellingPrice: 2665,
      total: 13325,
    },
    {
      name: 'Aluminum Chloride 10%',
      unitPrice: 54.16,
      quantity: 21,
      sellingPrice: 130,
      total: 2730,
    },
    {
      name: 'Aluminum Chloride 20%',
      unitPrice: '70',
      quantity: 0,
      sellingPrice: 250,
      total: 0,
    },
    {
      name: 'Anti-aging Flash',
      unitPrice: '1500 (3000 )',
      quantity: 3,
      sellingPrice: 4000,
      total: 12000,
    },
    {
      name: 'Azelaic crm',
      unitPrice: '124.16 (149 )',
      quantity: 20,
      sellingPrice: 360,
      total: 7200,
    },
    {
      name: 'Bearberry deo roll',
      unitPrice: '100',
      quantity: 6,
      sellingPrice: 250,
      total: 1500,
    },
    {
      name: 'Biocell Collagen (100pcs/bot)',
      unitPrice: '1500/bot (13.63 /tab )',
      quantity: 895,
      sellingPrice: 25,
      total: 22375,
    },
    {
      name: 'Candidral (Itraconazole)',
      unitPrice: '64.35 (85.80)',
      quantity: 155,
      sellingPrice: 80,
      total: 12400,
    },
    {
      name: 'Cetaphil AD Pro',
      unitPrice: '1,409.30 (1658)',
      quantity: 11,
      sellingPrice: 1820,
      total: 20020,
    },
    {
      name: 'Cetirizine',
      unitPrice: '3',
      quantity: 359,
      sellingPrice: 14,
      total: 5026,
    },
    {
      name: 'C - Glos ',
      unitPrice: '915.83 ( 1,099 )',
      quantity: 12,
      sellingPrice: 2500,
      total: 30000,
    },
    {
      name: 'Clindamycin solution',
      unitPrice: '55.00',
      quantity: 0,
      sellingPrice: 200,
      total: 0,
    },
    {
      name: 'Clobetasol crm ',
      unitPrice: '41.62',
      quantity: 13,
      sellingPrice: 250,
      total: 3250,
    },
    {
      name: 'Clobetasol oint',
      unitPrice: '41.62',
      quantity: 17,
      sellingPrice: 250,
      total: 4250,
    },
    {
      name: 'Dermazole Plus',
      unitPrice: '348.33 (522.50)',
      quantity: 6,
      sellingPrice: 510,
      total: 3060,
    },
    {
      name: 'Dexa crm',
      unitPrice: '49.75',
      quantity: 10,
      sellingPrice: 250,
      total: 2500,
    },
    {
      name: 'D3',
      unitPrice: '1.11',
      quantity: 1230,
      sellingPrice: 4,
      total: 4920,
    },
    {
      name: 'Ekran SPF 50',
      unitPrice: ' 500 ( 650 )',
      quantity: 10,
      sellingPrice: 1200,
      total: 12000,
    },
    {
      name: 'Endocare ampoule',
      unitPrice: '1244 (2488)',
      quantity: 18,
      sellingPrice: 2800,
      total: 50400,
    },
    {
      name: 'Endocare Gel cream',
      unitPrice: '1124 (2248)',
      quantity: 9,
      sellingPrice: 3000,
      total: 27000,
    },
    {
      name: 'Epiduo Forte',
      unitPrice: '1,700 (2,131.50)',
      quantity: 18,
      sellingPrice: 2345,
      total: 42210,
    },
    {
      name: 'Fairence ( TDF )',
      unitPrice: '3200 ( 4800 )',
      quantity: 2,
      sellingPrice: 5000,
      total: 10000,
    },
    {
      name: 'Fluocinolone crm ',
      unitPrice: '29.75',
      quantity: 9,
      sellingPrice: 240,
      total: 2160,
    },
    {
      name: 'Fluocinolone oint',
      unitPrice: '29.75',
      quantity: 11,
      sellingPrice: 240,
      total: 2640,
    },
    {
      name: 'Foskina',
      unitPrice: '212.66 (283.55 )',
      quantity: 14,
      sellingPrice: 280,
      total: 3920,
    },
    {
      name: 'GlutaWhite',
      unitPrice: '900 (1800)',
      quantity: 8,
      sellingPrice: 1790,
      total: 14320,
    },
    {
      name: 'Glycolic lotion',
      unitPrice: '83.33 (100 )',
      quantity: 10,
      sellingPrice: 500,
      total: 5000,
    },
    {
      name: 'Hbsone',
      unitPrice: '350 (490)',
      quantity: 1,
      sellingPrice: 600,
      total: 600,
    },
    {
      name: 'Heliocare cap',
      unitPrice: '21.23 (43.83)',
      quantity: 472,
      sellingPrice: 63,
      total: 29736,
    },
    {
      name: 'Hydra soap',
      unitPrice: '215.38 (280)',
      quantity: 87,
      sellingPrice: 360,
      total: 31320,
    },
    {
      name: 'Hydrocort crm ',
      unitPrice: '33.38',
      quantity: 9,
      sellingPrice: 240,
      total: 2160,
    },
    {
      name: 'Hydrocort oint',
      unitPrice: '33.38',
      quantity: 9,
      sellingPrice: 240,
      total: 2160,
    },
    {
      name: 'Hydroxyzine tab',
      unitPrice: '1',
      quantity: 1415,
      sellingPrice: 10,
      total: 14150,
    },
    {
      name: 'Karakleen ( Isotretinoin)',
      unitPrice: '440 (880)',
      quantity: 12,
      sellingPrice: 1200,
      total: 14400,
    },
    {
      name: 'Kenacort 10 mg ',
      unitPrice: '300',
      quantity: 9,
      sellingPrice: 3500,
      total: 31500,
    },
    {
      name: 'Kenacort  40 mg',
      unitPrice: '300',
      quantity: 12,
      sellingPrice: 3500,
      total: 42000,
    },
    {
      name: 'Litoderm toner',
      unitPrice: '203.07 (220)',
      quantity: 25,
      sellingPrice: 430,
      total: 10750,
    },
    {
      name: 'Matrix (biotin tab) (60pcs/bot)',
      unitPrice: '38.19/ 2,291.66 (2,750)',
      quantity: 1336,
      sellingPrice: 65,
      total: 86840,
    },
    {
      name: 'Metafit GLS (60pcs/box)',
      unitPrice: '19.50 /1,170 ( 2340 )',
      quantity: 110,
      sellingPrice: 38,
      total: 4180,
    },
    {
      name: 'Methotrexate',
      unitPrice: '17',
      quantity: 180,
      sellingPrice: 25,
      total: 4500,
    },
    {
      name: 'Miconazole crm',
      unitPrice: '32.25',
      quantity: 8,
      sellingPrice: 250,
      total: 2000,
    },
    {
      name: 'Miconaxole + Dexa 10:5',
      unitPrice: '51.37',
      quantity: 2,
      sellingPrice: 420,
      total: 840,
    },
    {
      name: 'Miconazole + Dexa crm (10:10)',
      unitPrice: '69.50',
      quantity: 4,
      sellingPrice: 520,
      total: 2080,
    },
    {
      name: 'Miconazole + Hydro crm (10:5)',
      unitPrice: '43.25',
      quantity: 10,
      sellingPrice: 420,
      total: 4200,
    },
    {
      name: 'Miconazole + Hydro crm (10:10)',
      unitPrice: '53.12',
      quantity: 0,
      sellingPrice: 520,
      total: 0,
    },
    {
      name: 'Microbiome',
      unitPrice: '607.50 (675)',
      quantity: 3,
      sellingPrice: 735,
      total: 2205,
    },
    {
      name: 'Minoxidil',
      unitPrice: '90.29',
      quantity: 11,
      sellingPrice: 290,
      total: 3190,
    },
    {
      name: 'Molutrex',
      unitPrice: '833.33 (1000)',
      quantity: 3,
      sellingPrice: 2000,
      total: 6000,
    },
    {
      name: 'Neotone Serum',
      unitPrice: '744 (1488)',
      quantity: 28,
      sellingPrice: 2500,
      total: 70000,
    },
    {
      name: 'Neotone Body',
      unitPrice: '929 (1858)',
      quantity: 26,
      sellingPrice: 3500,
      total: 91000,
    },
    {
      name: 'Neotone Eyes',
      unitPrice: '484 (968)',
      quantity: 16,
      sellingPrice: 2000,
      total: 32000,
    },
    {
      name: 'Neotone Radiance SPF 50',
      unitPrice: '795 (1588 )',
      quantity: 5,
      sellingPrice: 2500,
      total: 12500,
    },
    {
      name: 'Oil of Bergamot (pure)',
      unitPrice: '100',
      quantity: 0,
      sellingPrice: 350,
      total: 0,
    },
    {
      name: 'Oil of Bergamot (1:1)',
      unitPrice: '76',
      quantity: 0,
      sellingPrice: 300,
      total: 0,
    },
    {
      name: 'Orange soap',
      unitPrice: '47.20',
      quantity: 26,
      sellingPrice: 130,
      total: 3380,
    },
    {
      name: 'Photozyme Vit C',
      unitPrice: '2,359 ( 4,718 )',
      quantity: 7,
      sellingPrice: 4800,
      total: 33600,
    },
    {
      name: 'Pynocare',
      unitPrice: '1000(1400)',
      quantity: 10,
      sellingPrice: 1950,
      total: 19500,
    },
    {
      name: 'Retisome',
      unitPrice: '1133.33 (1,700)',
      quantity: 6,
      sellingPrice: 2800,
      total: 16800,
    },
    {
      name: 'Revitalizer ',
      unitPrice: '2450.00',
      quantity: 2,
      sellingPrice: 3450,
      total: 6900,
    },
    {
      name: 'Ruboril',
      unitPrice: '665 (798)',
      quantity: 6,
      sellingPrice: 1000,
      total: 6000,
    },
    {
      name: 'Sebamed shampoo',
      unitPrice: '341.42 (478)',
      quantity: 9,
      sellingPrice: 530,
      total: 4770,
    },
    {
      name: 'Sebamed shower oil',
      unitPrice: '499 (998)',
      quantity: 8,
      sellingPrice: 1100,
      total: 8800,
    },
    {
      name: 'Sodermix',
      unitPrice: '1,142.85 (1,600 )',
      quantity: 0,
      sellingPrice: 2000,
      total: 0,
    },
    {
      name: 'SPF 150',
      unitPrice: '360.00',
      quantity: 42,
      sellingPrice: 1200,
      total: 50400,
    },
    {
      name: 'SSA crm',
      unitPrice: '27.88',
      quantity: 6,
      sellingPrice: 240,
      total: 1440,
    },
    {
      name: 'Stockings ( All sizes )',
      unitPrice: '2295',
      quantity: 0,
      sellingPrice: 4500,
      total: 0,
    },
    {
      name: 'Tacroz',
      unitPrice: '708.75 (900)',
      quantity: 12,
      sellingPrice: 945,
      total: 11340,
    },
    {
      name: 'TCA 80%',
      unitPrice: '125',
      quantity: 6,
      sellingPrice: 1000,
      total: 6000,
    },
    {
      name: 'TeenDerm',
      unitPrice: '1166.60 (1,228)',
      quantity: 1,
      sellingPrice: 2000,
      total: 2000,
    },
    {
      name: 'Tetralysal',
      unitPrice: '78.74 (92.64)',
      quantity: 90,
      sellingPrice: 97,
      total: 8730,
    },
    {
      name: 'Thioderm lozenge',
      unitPrice: '2545.45 (2800 )',
      quantity: 21,
      sellingPrice: 3300,
      total: 73500,
    },
    {
      name: 'Total Whitening crm',
      unitPrice: '247.50 (495)',
      quantity: 0,
      sellingPrice: 1000,
      total: 0,
    },
    {
      name: 'Tranacix',
      unitPrice: '1562.50 (2500)',
      quantity: 6,
      sellingPrice: 3000,
      total: 18000,
    },
    {
      name: 'Tret .025',
      unitPrice: '20.80',
      quantity: 3,
      sellingPrice: 235,
      total: 705,
    },
    {
      name: 'Tret .05',
      unitPrice: '22',
      quantity: 3,
      sellingPrice: 350,
      total: 1050,
    },
    {
      name: 'Tyrowhite ',
      unitPrice: '333.33 ( 400 )',
      quantity: 22,
      sellingPrice: 1000,
      total: 22000,
    },
    {
      name: 'Ultra Rich',
      unitPrice: '3,538.50 (4,718)',
      quantity: 13,
      sellingPrice: 4800,
      total: 62400,
    },
    {
      name: 'Urea crm',
      unitPrice: '24.00',
      quantity: 4,
      sellingPrice: 240,
      total: 960,
    },
    {
      name: 'Urea paste',
      unitPrice: '128.33 (154)',
      quantity: 4,
      sellingPrice: 350,
      total: 1400,
    },
    {
      name: 'Vaniply',
      unitPrice: '226 (276 )',
      quantity: 5,
      sellingPrice: 320,
      total: 1600,
    },
    {
      name: 'Xamiol Gel',
      unitPrice: '1,114.10 ( 1,225.52 )',
      quantity: 3,
      sellingPrice: 1335,
      total: 4005,
    },
  ],
  Ointments: [
    {
      name: 'Clobetasol cream',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    {
      name: 'Clobetasol ointment',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    { name: 'Dexa cream', amount: 0.5, unit: 'kilo', less: false },
    {
      name: 'Fluocinolone cream',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    {
      name: 'Fluocinolone ointment',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    { name: 'Hydrocort cream', amount: 0.5, unit: 'kilo', less: false },
    {
      name: 'Hydrocort ointment',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    {
      name: 'Miconazole cream',
      amount: 0.5,
      unit: 'kilo',
      less: false,
    },
    { name: 'Minoxidil', amount: 1, unit: 'liter', less: false },
    { name: 'Tret .025', amount: 0.5, unit: 'kilo', less: true },
    { name: 'Tret 0.05', amount: 0.5, unit: 'kilo', less: false },
    { name: 'Urea cream', amount: 0.5, unit: 'kilo', less: false },
  ],
  Sold: [
    {
      name: 'A Test 1',
      unitPrice: 100,
      SellingPrice: 120,
      quantity: 20,
      dateSold: 1705049224243,
    },
  ],
};

export const loadTestData = function () {
  testData.Medicines.forEach((el) => state.Medicines.push(el));
  testData.Ointments.forEach((el) => state.Ointments.push(el));
};

/*
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
*/
