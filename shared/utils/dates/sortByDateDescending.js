const sortByDateDescending = (array, dateKey) => {
  if (!Array.isArray(array) || !dateKey) return array || [];

  return [...array].sort((a, b) => {
    const dateA = a[dateKey] ? new Date(a[dateKey]).getTime() : 0;
    const dateB = b[dateKey] ? new Date(b[dateKey]).getTime() : 0;

    return dateB - dateA;
  });
};

export default sortByDateDescending;
