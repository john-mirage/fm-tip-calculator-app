import TipAPI from "@api/tip-api";
import WebTextInput from "@components/web-text-input";

class WebFormBill extends WebTextInput {  
  constructor() {
    super();
    this.titleElement.textContent = "Bill";
    this.labeElement.textContent = "Bill";
    this.useElement.setAttribute("href", "#icon-dollar");
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputWheel = this.handleInputWheel.bind(this);
    this.handleBillChange = this.handleBillChange.bind(this);
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
    this.inputElement.addEventListener("wheel", this.handleInputWheel);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.inputElement.removeEventListener("keydown", this.handleInputKeydown);
    this.inputElement.removeEventListener("input", this.handleInputChange);
    this.inputElement.removeEventListener("wheel", this.handleInputWheel);
  }

  handleBillChange() {
    this.inputElement.value = this.bill;
  }

  handleInputKeydown(event: KeyboardEvent) {
    const firstInputRegex = /^[1-9]$/;
    const defaultInputRegex = /^\d$|^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$/;
    if (this.inputElement.value.length <= 0) {
      if (!firstInputRegex.test(event.key)) {
        event.preventDefault();
      }
    } else if (!defaultInputRegex.test(event.key)) {
      event.preventDefault();
    }
  }

  handleInputChange() {
    const startWithZerosRegex = /^0+(?=\d*$)/;
    const valueNeedToBeFormatted = startWithZerosRegex.test(this.inputElement.value);
    let newValue = this.inputElement.value;
    if (valueNeedToBeFormatted) {
      newValue = newValue.replace(startWithZerosRegex, "");
      this.inputElement.value = newValue;
    }
    if (newValue.length > 0) {
      this.inputElement.value = newValue;
      this.bill = newValue;
    } else {
      this.inputElement.value = "";
      this.bill = "";
    }
  }

  handleInputWheel(event: WheelEvent) {
    const direction = event.deltaY > 0 ? "down" : "up";
    const currentPeople = this.inputElement.value.length <= 0 ? 0 : Number(this.inputElement.value);
    switch (direction) {
      case "down": {
        const newPeople = currentPeople + 1;
        this.inputElement.value = String(newPeople);
        this.bill = String(newPeople);
        break;
      }
      case "up": {
        const newPeople = currentPeople - 1;
        if (currentPeople > 1) {
          this.inputElement.value = String(newPeople);
          this.bill = String(newPeople);
        } else if (currentPeople === 1) {
          this.inputElement.value = "";
          this.bill = "";
        }
        break;
      }
      default: throw new Error("The direction is not valid");
    }
  }
}

export default WebFormBill;