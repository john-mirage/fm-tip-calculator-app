import TipAPI from "@api/tip-api";
import WebTextInput from "@components/web-text-input";

const firstKeyRegex = /^[1-9]$/;
const defaultKeyRegex = /^\d$|^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$/;
const startWithZerosRegex = /^0+(?=\d*$)/;

class WebFormPeople extends WebTextInput {
  constructor() {
    super();
    this.titleElement.textContent = "Number of People";
    this.labeElement.textContent = "Number of People";
    this.useElement.setAttribute("href", "#icon-people");
    this.inputElement.setAttribute("pattern", "^[1-9]\\d*$");
    this.handlePeopleChange = this.handlePeopleChange.bind(this);
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputWheel = this.handleInputWheel.bind(this);
  }

  get people(): string {
    return TipAPI.people;
  }

  set people(newPeople: string) {
    TipAPI.updatePeople(newPeople, this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.handlePeopleChange();
    TipAPI.subscribe("people", this, this.handlePeopleChange);
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

  handlePeopleChange() {
    this.inputElement.value = this.people;
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
    const valueNeedToBeFormatted = startWithZerosRegex.test(this.inputElement.value);
    let newValue = this.inputElement.value;
    if (valueNeedToBeFormatted) {
      newValue = newValue.replace(startWithZerosRegex, "");
      this.inputElement.value = newValue;
    }
    if (this.inputElement.validity.valid) {
      if (this.errorElement.textContent !== "") this.errorElement.textContent = "";
      this.people = newValue;
    } else {
      if (this.errorElement.textContent !== "Wrong format") this.errorElement.textContent = "Wrong format";
      this.people = "";
    }
  }

  handleInputWheel(event: WheelEvent) {
    if (document.activeElement === this.inputElement) {
      const direction = event.deltaY > 0 ? "down" : "up";
      const currentPeople = this.inputElement.value.length <= 0 ? 0 : Number(this.inputElement.value);
      switch (direction) {
        case "down": {
          const newPeople = String(currentPeople + 1);
          this.inputElement.value = newPeople;
          this.people = newPeople;
          break;
        }
        case "up": {
          const newPeople = String(currentPeople - 1);
          if (currentPeople > 1) {
            this.inputElement.value = newPeople;
            this.people = newPeople;
          } else if (currentPeople === 1) {
            this.inputElement.value = "";
            this.people = "";
          }
          break;
        }
        default: throw new Error("The direction is not valid");
      }
    }
  }
}

export default WebFormPeople;