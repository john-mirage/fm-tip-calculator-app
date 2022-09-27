import "./style.css";

class WebCustomRadioInput extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-custom-radio-input");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webCustomRadioInput");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebCustomRadioInput;