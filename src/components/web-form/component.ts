import "./component.css";

class WebForm extends HTMLElement {
  #initialMount = true;
  
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webForm");
      this.#initialMount = false;
    }
  }
}

export default WebForm;