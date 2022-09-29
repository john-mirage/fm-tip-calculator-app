import "./style.css";

class WebFormTipRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #inputElement: HTMLInputElement;
  #labelElement: HTMLLabelElement;

  static get observedAttributes() {
    return ["data-value"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#inputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="input"]');
    this.#labelElement = <HTMLLabelElement>this.#templateFragment.querySelector('[data-js="label"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get value(): string | undefined {
    return this.dataset.value;
  }

  set value(newValue: string | undefined) {
    if (typeof newValue === "string") {
      this.dataset.value = newValue;
    } else {
      delete this.dataset.value;
    }
  }

  get checked(): boolean {
    return this.#inputElement.checked;
  }

  set checked(isChecked: boolean) {
    this.#inputElement.checked = isChecked;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.#inputElement.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    this.#inputElement.removeEventListener("change", this.handleInputChange);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-value":
        const hasValue = typeof newValue === "string";
        if (hasValue) {
          this.#inputElement.value = newValue;
          this.#labelElement.textContent = `${newValue}%`;
        } else {
          this.#inputElement.value = "";
          this.#labelElement.textContent = null;
        }
        break;
      default:
        throw new Error("The modified attribute is not watched");
    }
  }

  handleInputChange() {
    const customEvent = new CustomEvent("tip-changed", {
      bubbles: true,
      detail: { radioElement: this }
    });
    this.dispatchEvent(customEvent);
  }
}

export default WebFormTipRadio;