interface Transaction {
  id: number;
  name: string;
  label: string;
  userId: number;
  amount: number;
  transactionCategory: string;
  transactionDate: string;
  transactionFrequency: string;
  transactionType: "EXPENSE" | "INCOME";
}

function prettyDate(date: string): string {
  const vals = date.split("-");
  const year = vals[0];
  let month = "";
  const day = vals[2];
  switch (vals[1]) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      break;
  }
  return `${month} ${day}, ${year}`;
}

export { type Transaction, prettyDate };
