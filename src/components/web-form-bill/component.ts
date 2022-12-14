import TipAPI from "@api/tip-api";
import WebTextInput from "@components/web-text-input";

const firstKeyRegex = /^\d$|^Tab$/;
const defaultKeyRegex = /^\d$|^\.$|^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$|^Tab$/;

class WebFormBill extends WebTextInput {
  constructor() {
    super();
    this.titleElement.textContent = "Bill";
    this.labeElement.textContent = "Bill";
    this.useElement.setAttribute("href", "#icon-dollar");
    this.inputElement.setAttribute("pattern", "^\\d+$|^\\d+\\.\\d{0,2}$");
    this.handleBillChange = this.handleBillChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get bill(): string {
    return TipAPI.bill;
  }

  set bill(newBill: string) {
    TipAPI.updateBill(newBill, this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleBillChange();
    TipAPI.subscribe("bill", this, this.handleBillChange);
    this.inputElement.addEventListener("keydown", this.handleInputKeydown);
    this.inputElement.addEventListener("input", this.handleInputChange);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.inputElement.removeEventListener("keydown", this.handleInputKeydown);
    this.inputElement.removeEventListener("input", this.handleInputChange);
  }

  handleBillChange() {
    this.inputElement.value = this.bill;
    this.handleInputValidity();
  }

  handleInputKeydown(event: KeyboardEvent) {
    if (this.inputElement.value.length <= 0) {
      if (!firstKeyRegex.test(event.key)) {
        event.preventDefault();
      }
    } else if (!defaultKeyRegex.test(event.key)) {
      event.preventDefault();
    }
  }

  handleInputChange() {
    if (this.inputElement.validity.valid) {
      let newValue = this.inputElement.value;
      const valueNeedToBeFormatted = newValue.endsWith(".");
      if (valueNeedToBeFormatted) newValue = newValue.replace(/\.$/, "");
      this.bill = newValue;
    } else {
      this.bill = "0";
    }
    this.handleInputValidity();
  }
}

export default WebFormBill;