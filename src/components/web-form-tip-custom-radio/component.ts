import "./style.css";

const firstKeyRegex = /^[1-9]$/;
const defaultKeyRegex = /^\d$|^Backspace$|^Delete$|^ArrowLeft$|^ArrowRight$/;
const startWithZerosRegex = /^0+(?=\d*$)/;

class WebFormTipCustomRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #textInputElement: HTMLInputElement;
  #radioInputElement: HTMLInputElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-custom-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#textInputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="text-input"]');
    this.#radioInputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="radio-input"]');
    this.handleInputKeydown = this.handleInputKeydown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputWheel = this.handleInputWheel.bind(this);
  }

  get value(): string {
    return this.radioInputValue;
  }

  set value(newValue: string) {
    this.radioInputValue = newValue;
    this.textInputValue = newValue;
  }

  get radioInputValue(): string {
    return this.#radioInputElement.value;
  }

  set radioInputValue(newRadioInputValue: string) {
    this.#radioInputElement.value = newRadioInputValue;
    if (this.radioInputValue.length > 0) {
      if (!this.#radioInputElement.checked) this.#radioInputElement.checked = true;
    } else if (this.#radioInputElement.checked) {
      this.#radioInputElement.checked = false;
    }
  }

  get textInputValue(): string {
    return this.#textInputElement.value;
  }

  set textInputValue(newTextInputValue: string) {
    this.#textInputElement.value = newTextInputValue;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipCustomRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    if (typeof this.dataset.initial === "string") this.radioInputValue = this.dataset.initial;
    this.#textInputElement.addEventListener("keydown", this.handleInputKeydown);
    this.#textInputElement.addEventListener("input", this.handleInputChange);
    this.#textInputElement.addEventListener("wheel", this.handleInputWheel);
  }

  disconnectedCallback() {
    this.#textInputElement.removeEventListener("keydown", this.handleInputKeydown);
    this.#textInputElement.removeEventListener("input", this.handleInputChange);
    this.#textInputElement.removeEventListener("wheel", this.handleInputWheel);
  }

  handleInputKeydown(event: KeyboardEvent) {
    if (this.textInputValue.length <= 0) {
      if (!firstKeyRegex.test(event.key)) {
        event.preventDefault();
      }
    } else if (!defaultKeyRegex.test(event.key)) {
      event.preventDefault();
    }
  }

  handleInputChange() {
    const valueNeedToBeFormatted = startWithZerosRegex.test(this.textInputValue);
    let newValue = this.textInputValue;
    if (valueNeedToBeFormatted) {
      newValue = newValue.replace(startWithZerosRegex, "");
      this.textInputValue = newValue;
    }
    this.radioInputValue = newValue;
    if (this.#textInputElement.validity.valid) {
      this.sendTipChangeEvent(newValue);
    }
  }

  handleInputWheel(event: WheelEvent) {
    if (document.activeElement === this.#textInputElement) {
      const direction = event.deltaY > 0 ? "down" : "up";
      const currentTip = this.textInputValue.length <= 0 ? 0 : Number(this.textInputValue);
      switch (direction) {
        case "down": {
          const newTip = String(currentTip + 1);
          this.value = newTip;
          this.sendTipChangeEvent(newTip);
          break;
        }
        case "up": {
          const newTip = String(currentTip - 1);
          if (currentTip > 1) {
            this.value = newTip;
            this.sendTipChangeEvent(newTip);
          } else if (currentTip === 1) {
            this.value = "";
            this.sendTipChangeEvent("");
          }
          break;
        }
        default: throw new Error("The direction is not valid");
      }
    }
  }

  sendTipChangeEvent(newTip: string) {
    const customEvent = new CustomEvent("custom-tip-changed", {
      bubbles: true,
      detail: { value: newTip }
    });
    this.dispatchEvent(customEvent);
  }
}

export default WebFormTipCustomRadio;