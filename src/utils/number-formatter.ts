const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function formatNumberToDollar(number: number): string {
  return numberFormatter.format(number);
}

export default formatNumberToDollar;