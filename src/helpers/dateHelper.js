const formatDate = (dateString) => {
  const date = new Date(dateString);

  const isToday = new Date().toDateString() === date.toDateString();

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const dayMonthOptions = { day: "numeric", month: "short" };

  const timePart = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
  const dayMonthPart = new Intl.DateTimeFormat("en-US", dayMonthOptions).format(
    date
  );

  return isToday ? `${timePart}` : `${dayMonthPart}`;
};

export { formatDate };
