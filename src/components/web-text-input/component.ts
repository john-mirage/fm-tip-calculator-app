import "./style.css";

class WebTextInput extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  titleElement: HTMLHeadingElement;
  labeElement: HTMLLabelElement;
  inputElement: HTMLInputElement;
  useElement: SVGUseElement;
  errorElement: HTMLSpanElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-text-input");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.titleElement = <HTMLHeadingElement>this.#templateFragment.querySelector('[data-js="title"]');
    this.labeElement = <HTMLLabelElement>this.#templateFragment.querySelector('[data-js="label"]');
    this.inputElement = <HTMLInputElement>this.#templateFragment.querySelector('[data-js="input"]');
    this.useElement = <SVGUseElement>this.#templateFragment.querySelector('[data-js="icon"]');
    this.errorElement = <HTMLSpanElement>this.#templateFragment.querySelector('[data-js="error"]');
    this.inputElement.setAttribute("minlength", "1");
    this.inputElement.setAttribute("inputmode", "numeric");
    this.inputElement.setAttribute("spellcheck", "false");
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webTextInput");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }

  handleInputValidity() {
    if (this.inputElement.validity.valid) {
      if (this.errorElement.textContent !== "") this.errorElement.textContent = "";
      if (this.classList.contains("webTextInput--error")) this.classList.remove("webTextInput--error");
    } else {
      if (this.errorElement.textContent !== "Wrong format") this.errorElement.textContent = "Wrong format";
      if (!this.classList.contains("webTextInput--error")) this.classList.add("webTextInput--error");
    }
  }
}

export default WebTextInput;