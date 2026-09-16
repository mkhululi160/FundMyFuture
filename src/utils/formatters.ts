export const formatCurrency = (amount: number): string => {
  return `R${amount.toLocaleString('en-ZA')}`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};