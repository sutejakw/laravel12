export const formatDateWithTime = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-'; // Handle invalid dates

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Covers 4th to 20th
    const suffixes = ['st', 'nd', 'rd'];
    return suffixes[(day % 10) - 1] || 'th';
  };

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  // Check if the input date string includes time information
  const hasTime = typeof dateString === 'string' && dateString.includes('T');

  if (hasTime) {
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${month} ${day}${getOrdinalSuffix(day)}, ${year} ${time}`;
  }

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};
