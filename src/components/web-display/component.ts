import TipAPI from "@api/tip-api";
import "./style.css";

class WebDisplay extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #buttonElement: HTMLButtonElement;
  #bill?: number;
  #tip?: number;
  #people?: number;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#buttonElement = <HTMLButtonElement>this.#templateFragment.querySelector('[data-js="button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get bill(): number | undefined {
    return this.#bill;
  }

  set bill(newBill: number | undefined) {
    this.#bill = newBill;
    this.handleButtonState();
  }

  get tip(): number | undefined {
    return this.#tip;
  }

  set tip(newTip: number | undefined) {
    this.#tip = newTip;
    this.handleButtonState();
  }

  get people(): number | undefined {
    return this.#people;
  }

  set people(newPeople: number | undefined) {
    this.#people = newPeople;
    this.handleButtonState();
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplay");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    TipAPI.subscribe("bill", this);
    TipAPI.subscribe("tip", this);
    TipAPI.subscribe("people", this);
    this.bill = TipAPI.bill;
    this.tip = TipAPI.tip;
    this.people = TipAPI.people;
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe("bill", this);
    TipAPI.unsubscribe("tip", this);
    TipAPI.unsubscribe("people", this);
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  handleButtonClick() {
    TipAPI.bill = undefined;
    TipAPI.tip = undefined;
    TipAPI.people = undefined;
  }

  handleButtonState() {
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