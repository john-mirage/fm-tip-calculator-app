import TipAPI from "@api/tip-api";
import WebTextInput from "@components/web-text-input";

class WebFormPeople extends WebTextInput {  
  #people?: number;

  constructor() {
    super();
    this.titleElement.textContent = "Number of People";
    this.labeElement.textContent = "Number of People";
    this.useElement.setAttribute("href", "#icon-people");
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputWheel = this.handleInputWheel.bind(this);
  }

  get people(): number | undefined {
    return this.#people;
  }

  set people(newPeople: number | undefined) {
    console.log("people has been updated");
    this.#people = newPeople;
    const people = typeof this.people === "number" ? String(this.people) : "";
    if (this.inputElement.value !== people) {
      console.log("people is not sync with the input");
      this.inputElement.value = people;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.people = TipAPI.people;
    TipAPI.subscribe("people", this);
    this.inputElement.addEventListener("keydown", this.handleInputKeydown);
    this.inputElement.addEventListener("input", this.handleInputChange);
    this.inputElement.addEventListener("wheel", this.handleInputWheel);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe("people", this);
    this.inputElement.removeEventListener("keydown", this.handleInputKeydown);
    this.inputElement.removeEventListener("input", this.handleInputChange);
    this.inputElement.removeEventListener("wheel", this.handleInputWheel);
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
      TipAPI.people = Number(newValue);
    } else {
      TipAPI.people = undefined;
    }
  }

  handleInputWheel(event: WheelEvent) {
    const direction = event.deltaY > 0 ? "down" : "up";
    const currentPeople = this.inputElement.value.length <= 0 ? 0 : Number(this.inputElement.value);
    switch (direction) {
      case "down": {
        const newPeople = currentPeople + 1;
        this.inputElement.value = String(newPeople);
        TipAPI.people = newPeople;
        break;
      }
      case "up": {
        const newPeople = currentPeople - 1;
        if (currentPeople > 1) {
          this.inputElement.value = String(newPeople);
          TipAPI.people = newPeople;
        } else if (currentPeople === 1) {
          this.inputElement.value = "";
          TipAPI.people = undefined;
        }
        break;
      }
      default: throw new Error("The direction is not valid");
    }
  }
}

export default WebFormPeople;