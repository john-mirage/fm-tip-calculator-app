import TipAPI from "@api/tip-api";
import "./style.css";

class WebFormTip extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #radioInputs: NodeListOf<HTMLElement>;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#radioInputs = <NodeListOf<HTMLElement>>this.#templateFragment.querySelectorAll('[data-js="radio"]');
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
  }

  get tip(): number | undefined {
    return TipAPI.tip;
  }

  set tip(newTip: number | undefined) {
    TipAPI.updateTip(newTip, this);
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTip");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    TipAPI.subscribe("tip", this, this.handleTipChange);
    this.addEventListener("tip-changed", this.handleRadioChange);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.removeEventListener("tip-changed", this.handleRadioChange);
  }

  handleTipChange() {
    const newTip = this.tip;
    if (typeof newTip === "string") {
      console.log("new value");
    } else {
      this.#radioInputs.forEach((radioInput) => radioInput.checked = false);
    }
  }

  handleRadioChange(event: Event) {
    const { radioElement } = (<CustomEvent>event).detail;
    this.#radioInputs.forEach((radioInput) => {
      if (radioElement !== radioInput) {
        console.log("disable")
        radioInput.checked = false;
      }
    });
    this.tip = Number(radioElement.value / 100);
  }
}

export default WebFormTip;