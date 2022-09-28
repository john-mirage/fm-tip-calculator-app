import WebDisplayRow from "@components/web-display-row";

class WebDisplayAmount extends WebDisplayRow {
  #tipAmount?: number;
  
  constructor() {
    super();
    this.titleElement.textContent = "Tip Amount";
  }

  get tipAmount(): number | undefined {
    return this.#tipAmount;
  }

  set tipAmount(newTipAmount: number | undefined) {
    this.#tipAmount = newTipAmount;
    if (typeof newTipAmount === "number") {
      this.valueElement.textContent = String(newTipAmount);
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebDisplayAmount;