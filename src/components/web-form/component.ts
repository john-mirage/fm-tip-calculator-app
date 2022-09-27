import "./style.css";

class WebForm extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #billWebTextInput;
  #peopleWebTextInput;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webForm");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebForm;