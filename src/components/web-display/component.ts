import "./style.css";

class WebDisplay extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplay");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
  }

  calculateTip(bill: number, tip: number, people: number) {
    this.tipAmount = (bill * tip) / people;
    this.total = ((bill * tip) + bill) / people;
  }
}

export default WebDisplay;