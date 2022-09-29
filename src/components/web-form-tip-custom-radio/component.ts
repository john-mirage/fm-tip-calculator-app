import "./style.css";

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
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
  }

  get value(): string {
    return this.#textInputElement.value;
  }

  set value(newValue: string) {
    this.#textInputElement.value = newValue;
  }

  get checked(): boolean {
    return this.#radioInputElement.checked;
  }

  set checked(isChecked: boolean) {
    this.#radioInputElement.checked = isChecked;
    if (!this.checked) this.value = "";
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipCustomRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    if (typeof this.dataset.initial === "string") this.value = this.dataset.initial;
    this.#textInputElement.addEventListener("input", this.handleTextInputChange);
  }

  disconnectedCallback() {
    this.#textInputElement.removeEventListener("input", this.handleTextInputChange);
  }

  handleTextInputChange() {
    const hasValue = this.value.length > 0;
    if (hasValue) {
      this.checked = true;
      const customEvent = new CustomEvent("tip-changed", {
        bubbles: true,
        detail: { radioElement: this }
      });
      this.dispatchEvent(customEvent);
    } else {
      this.checked = false;
    }
  }
}

export default WebFormTipCustomRadio;