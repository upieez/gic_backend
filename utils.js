const calculateDaysInCafe = (startDate) => {
  const start = new Date(startDate);
  const end = new Date();
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

exports.calculateDaysInCafe = calculateDaysInCafe;
