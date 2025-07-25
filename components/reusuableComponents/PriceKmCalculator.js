export const calculatePrice = (distanceKm) => {
  if (distanceKm < 0) return 0; // or throw error for invalid input

  for (let i = 0; i < 20; i++) {
    const min = i * 5 + (i === 0 ? 0 : 1);
    const max = (i + 1) * 5;
    if (distanceKm >= min && distanceKm <= max) {
      return (i + 1) * 1000;
    }
  }

  if (distanceKm > 100) {
    const extra = Math.ceil((distanceKm - 100) / 5);
    return 20000 + extra * 1000;
  }
  return 0;
};
