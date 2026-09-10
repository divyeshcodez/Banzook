export const formatINR = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatPrice = (amount: number): string => {
  return formatINR(amount);
};
