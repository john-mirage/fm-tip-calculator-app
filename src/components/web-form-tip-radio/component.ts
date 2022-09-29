import "./style.css";

class WebFormTipRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #inputElement: HTMLInputElement;
  #labelElement: HTMLLabelElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#inputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="input"]');
    this.#labelElement = <HTMLLabelElement>this.#templateFragment.querySelector('[data-js="label"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get value(): string {
    return this.#inputElement.value;
  }

  set value(newValue: string) {
    this.#inputElement.value = newValue;
    this.#labelElement.textContent = `${newValue}%`;
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
    if (typeof this.dataset.initial === "string") this.value = this.dataset.initial;
    this.#inputElement.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    this.#inputElement.removeEventListener("change", this.handleInputChange);
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