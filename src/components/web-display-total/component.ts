import WebDisplayRow from "@components/web-display-row";
import formatNumber from "@utils/number-formatter";

class WebDisplayTotal extends WebDisplayRow {
  #total: number = 0;
  
  constructor() {
    super();
    this.titleElement.textContent = "Total";
  }

  get total(): number {
    return this.#total;
  }

  set total(newTotal: number) {
    this.#total = newTotal;
    if (typeof newTotal === "number") {
      this.valueElement.textContent = formatNumber(newTotal);
    } else {
      this.valueElement.textContent = formatNumber(0);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.total = this.total;
  }
}

export default WebDisplayTotal;