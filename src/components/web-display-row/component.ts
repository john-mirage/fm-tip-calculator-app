import formatNumberToDollar from "@utils/number-formatter";
import "./style.css";

class WebDisplayRow extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #labelElement: HTMLHeadingElement;
  #valueElement: HTMLParagraphElement;
  
  static get observedAttributes() {
    return ["data-label", "data-value"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display-row");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#labelElement = <HTMLHeadingElement>this.#templateFragment.querySelector('[data-js="label"]');
    this.#valueElement = <HTMLParagraphElement>this.#templateFragment.querySelector('[data-js="value"]');
  }

  get label(): string | undefined {
    return this.dataset.label;
  }

  set label(newLabel: string | undefined) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      delete this.dataset.label;
    }
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

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplayRow");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.value = "0";
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "data-label":
        this.#labelElement.textContent = newValue;
        break;
      case "data-value":
        const formattedValue = formatNumberToDollar(Number(newValue));
        this.handleValueSize(formattedValue.length);
        this.#valueElement.textContent = formattedValue;
        break;
      default:
        throw new Error("The modified attribute is not valid");
    }
  }

  handleValueSize(length: number) {
    if (length > 12) {
      this.#valueElement.classList.add("webDisplayRow__value--verySmall");
    } else if (length > 8) {
      this.#valueElement.classList.add("webDisplayRow__value--small");
    } else {
      this.#valueElement.classList.remove("webDisplayRow__value--small", "webDisplayRow__value--verySmall");
    }
  }
}

export default WebDisplayRow;