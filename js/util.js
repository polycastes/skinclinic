export const formatNumbers = function (amount, decimal = 0) {
  return new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: decimal,
  }).format(amount);
};

export const formatTwoDigits = function (amount) {
  return new Intl.NumberFormat('en-PH', {
    minimumIntegerDigits: 2,
  }).format(amount);
};

export const formatCurrency = function (price) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(price);
};
