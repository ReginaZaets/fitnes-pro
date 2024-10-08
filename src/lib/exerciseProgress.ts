export const exerciseProgress = (quantity: number, maxQuantity: number) => {
  let currentProgress = Math.round((quantity / maxQuantity) * 100);
  if (currentProgress > 100) {
    const exLimit = currentProgress - 100;
    currentProgress = currentProgress - exLimit;
  }
  return currentProgress;
};
