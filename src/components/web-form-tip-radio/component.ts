import "./style.css";

class WebFormTipRadio extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip-radio");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTipRadio");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebFormTipRadio;