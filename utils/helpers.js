const formatDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th"; // Covers 11th to 19th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || str.trim() === "") {
    return str; // Return the original input if it's not a valid string
  }
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
};

export { formatDate, capitalizeFirstLetter };
