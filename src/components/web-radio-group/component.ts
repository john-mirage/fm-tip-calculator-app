import "./style.css";

class WebRadioGroup extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-radio-group");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webRadioGroup");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebRadioGroup;