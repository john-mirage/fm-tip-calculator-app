import "./style.css";

class WebDisplayRow extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display-row");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplayRow");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebDisplayRow;