import "./style.css";

class WebFormTipCustomRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #textInputElement: HTMLInputElement;
  #radioInputElement: HTMLInputElement;

  static get observedAttributes() {
    return ["data-value"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-custom-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#textInputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="text-input"]');
    this.#radioInputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="radio-input"]');
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
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
    return this.#radioInputElement.checked;
  }

  set checked(isChecked: boolean) {
    this.#radioInputElement.checked = isChecked;
    if (!this.checked) this.#textInputElement.value = "";
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipCustomRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.#textInputElement.addEventListener("input", this.handleTextInputChange);
  }

  disconnectedCallback() {
    this.#textInputElement.removeEventListener("input", this.handleTextInputChange);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-value":
        const hasValue = typeof newValue === "string";
        if (hasValue) {
          this.#radioInputElement.checked = true;
          const customEvent = new CustomEvent("tip-changed", {
            bubbles: true,
            detail: { radioElement: this }
          });
          this.dispatchEvent(customEvent);
        } else {
          this.#radioInputElement.checked = false;
        }
        break;
      default:
        throw new Error("The modified attribute is not watched");
    }
  }

  handleTextInputChange() {
    this.value = this.#textInputElement.value.length > 0 ? this.#textInputElement.value : undefined;
  }
}

export default WebFormTipCustomRadio;