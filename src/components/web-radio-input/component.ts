import "./style.css";

class WebRadioInput extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-radio-input");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webRadioInput");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebRadioInput;