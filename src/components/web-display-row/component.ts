import "./style.css";

class WebDisplayRow extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  titleElement: HTMLHeadingElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display-row");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.titleElement = <HTMLHeadingElement>this.#templateFragment.querySelector('[data-js="title"]');
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