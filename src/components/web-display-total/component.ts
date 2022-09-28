import WebDisplayRow from "@components/web-display-row";

class WebDisplayTotal extends WebDisplayRow {
  #total?: number;
  
  constructor() {
    super();
    this.titleElement.textContent = "Total";
  }

  get total(): number | undefined {
    return this.#total;
  }

  set total(newTotal: number | undefined) {
    this.#total = newTotal;
    if (typeof newTotal === "number") {
      this.valueElement.textContent = String(newTotal);
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebDisplayTotal;