const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function formatNumber(number: number): string {
  return numberFormatter.format(number);
}

export default formatNumber;