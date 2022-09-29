import TipAPI from "@api/tip-api";
import "./style.css";

class WebDisplay extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #buttonElement: HTMLButtonElement;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#buttonElement = <HTMLButtonElement>this.#templateFragment.querySelector('[data-js="button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonState = this.handleButtonState.bind(this);
  }

  get bill(): number | undefined {
    return TipAPI.bill;
  }

  set bill(newBill: number | undefined) {
    TipAPI.updateBill(newBill, this);
  }

  get tip(): number | undefined {
    return TipAPI.tip;
  }

  set tip(newTip: number | undefined) {
    TipAPI.updateBill(newTip, this);
  }

  get people(): number | undefined {
    return TipAPI.people;
  }

  set people(newPeople: number | undefined) {
    TipAPI.updatePeople(newPeople, this);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplay");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    TipAPI.subscribe("bill", this, this.handleButtonState);
    TipAPI.subscribe("tip", this, this.handleButtonState);
    TipAPI.subscribe("people", this, this.handleButtonState);
    this.handleButtonState();
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  handleButtonClick() {
    this.bill = undefined;
    this.tip = undefined;
    this.people = undefined;
    this.handleButtonState();
  }

  handleButtonState() {
    console.log("update display reset button");
    if (!this.bill && !this.tip && !this.people) {
      if (!this.#buttonElement.hasAttribute("disabled")) {
        this.#buttonElement.setAttribute("disabled", "");
      }
    } else if (this.#buttonElement.hasAttribute("disabled")) {
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  /*
  handleDisplayRows() {
    const bill = this.bill;
    const people = this.people;
    if (bill && people) {
      const tip = this.tip || 0;
      this.#webDisplayAmount.amount = (bill * tip) / people;
      this.#webDisplayTotal.total = ((bill * tip) + bill) / people;
    } else {
      this.#webDisplayAmount.amount = 0;
      this.#webDisplayTotal.total = 0;
    }
  }
  */
}

export default WebDisplay;