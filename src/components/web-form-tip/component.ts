import TipAPI from "@api/tip-api";
import "./style.css";

class WebFormTip extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
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
      //
    }
  }

  handleRadioChange(event: Event) {
    const { radioElement } = (<CustomEvent>event).detail;
    this.tip = Number(radioElement.value / 100);
  }
}

export default WebFormTip;