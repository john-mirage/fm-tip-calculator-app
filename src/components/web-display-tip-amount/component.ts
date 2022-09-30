import WebDisplayRow from "@components/web-display-row";
import formatNumber from "@utils/number-formatter";

class WebDisplayTipAmount extends WebDisplayRow {
  #tipAmount: number = 0;
  
  constructor() {
    super();
    this.titleElement.textContent = "Tip Amount";
  }

  get tipAmount(): number {
    return this.#tipAmount;
  }

  set tipAmount(newTipAmount: number) {
    this.#tipAmount = newTipAmount;
    if (typeof newTipAmount === "number") {
      this.valueElement.textContent = formatNumber(newTipAmount);
    } else {
      this.valueElement.textContent = formatNumber(0);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.tipAmount = this.tipAmount;
  }
}

export default WebDisplayTipAmount;