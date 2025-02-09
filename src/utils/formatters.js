export const formatInrCurrency = (value) => {
  if (!value) return '';
  const number = parseFloat(value);
  if (isNaN(number)) return '';
  
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(number);
}; 