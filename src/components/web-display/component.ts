import TipAPI from "@api/tip-api";
import WebDisplayRow from "@components/web-display-row";
import formatNumberToDollar from "@utils/number-formatter";
import "./style.css";

class WebDisplay extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #buttonElement: HTMLButtonElement;
  #webDisplayTipAmount: WebDisplayRow;
  #webDisplayTotal: WebDisplayRow;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-display");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#buttonElement = <HTMLButtonElement>this.#templateFragment.querySelector('[data-js="button"]');
    this.#webDisplayTipAmount = <WebDisplayRow>this.#templateFragment.querySelector('[data-js="tip-amount"]');
    this.#webDisplayTotal = <WebDisplayRow>this.#templateFragment.querySelector('[data-js="total"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  get bill(): string {
    return TipAPI.bill;
  }

  set bill(newBill: string) {
    TipAPI.updateBill(newBill, this);
  }

  get tip(): string {
    return TipAPI.tip;
  }

  set tip(newTip: string) {
    TipAPI.updateTip(newTip, this);
  }

  get people(): string {
    return TipAPI.people;
  }

  set people(newPeople: string) {
    TipAPI.updatePeople(newPeople, this);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webDisplay");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    TipAPI.subscribe("bill", this, this.handleDataChange);
    TipAPI.subscribe("tip", this, this.handleDataChange);
    TipAPI.subscribe("people", this, this.handleDataChange);
    this.handleButtonState();
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  handleButtonClick() {
    this.bill = "";
    this.tip = "";
    this.people = "";
    this.handleDataChange();
  }

  handleButtonState() {
    const hasNoBill = this.bill.length <= 0;
    const hasNoTip = this.tip.length <= 0;
    const hasNoPeople = this.people.length <= 0;
    if (hasNoBill && hasNoTip && hasNoPeople) {
      if (!this.#buttonElement.hasAttribute("disabled")) {
        this.#buttonElement.setAttribute("disabled", "");
      }
    } else if (this.#buttonElement.hasAttribute("disabled")) {
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  handleDataChange() {
    this.handleButtonState();
    const bill = this.bill.length > 0 ? Number(this.bill) : 0;
    const people = this.people.length > 0 ? Number(this.people) : 0;
    if (bill > 0 && people > 0) {
      const tip = this.tip.length > 0 ? (Number(this.tip) / 100) : 0;
      this.#webDisplayTipAmount.value = formatNumberToDollar((bill * tip) / people);
      this.#webDisplayTotal.value = formatNumberToDollar(((bill * tip) + bill) / people);
    } else {
      this.#webDisplayTipAmount.value = formatNumberToDollar(0);
      this.#webDisplayTotal.value = formatNumberToDollar(0);
    }
  }
}

export default WebDisplay;