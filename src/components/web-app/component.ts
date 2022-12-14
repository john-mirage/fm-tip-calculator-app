import "./style.css";

class WebApp extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-app");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webApp");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }
}

export default WebApp;