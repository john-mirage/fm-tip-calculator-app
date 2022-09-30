import "./style.css";

class WebFormTipRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #radioInputElement: HTMLInputElement;
  #labelElement: HTMLLabelElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#radioInputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="input"]');
    this.#labelElement = <HTMLLabelElement>this.#templateFragment.querySelector('[data-js="label"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get value(): string {
    return this.#radioInputElement.value;
  }

  set value(newValue: string) {
    this.#radioInputElement.value = newValue;
    this.#labelElement.textContent = `${newValue}%`;
  }

  get checked(): boolean {
    return this.#radioInputElement.checked;
  }

  set checked(isChecked: boolean) {
    this.#radioInputElement.checked = isChecked;
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    if (typeof this.dataset.initial === "string") this.value = this.dataset.initial;
    this.#radioInputElement.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    this.#radioInputElement.removeEventListener("change", this.handleInputChange);
  }

  handleInputChange() {
    const customEvent = new CustomEvent("tip-changed", {
      bubbles: true,
      detail: { value: this.value }
    });
    this.dispatchEvent(customEvent);
  }
}

export default WebFormTipRadio;