import "./component.css";

class WebDisplay extends HTMLElement {
  #initialMount = true;
  
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplay");
      this.#initialMount = false;
    }
  }
}

export default WebDisplay;