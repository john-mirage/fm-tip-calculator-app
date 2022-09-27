import "./style.css";

class WebTextInput extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-text-input");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webTextInput");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebTextInput;