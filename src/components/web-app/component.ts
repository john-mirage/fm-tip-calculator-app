import "./component.css";

class WebApp extends HTMLElement {
  #initialMount = true;
  
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webApp");
      this.#initialMount = false;
    }
  }
}

export default WebApp;