import "./style.css";

class WebFormTipCustomRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-custom-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipCustomRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebFormTipCustomRadio;