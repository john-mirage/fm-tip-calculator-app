import TipAPI from "@api/tip-api";
import "./style.css";

class WebFormTip extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #tip?: number;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.handleTipChange = this.handleTipChange.bind(this);
  }

  get tip(): number | undefined {
    return this.#tip;
  }

  set tip(newTip: number | undefined) {
    this.#tip = newTip;
    if (this.tip) {

    } else {

    }
  }

  connectedCallback() {
    if (this.#initialMount) {
      this.classList.add("webFormTip");
      this.append(this.#templateFragment);
      this.#initialMount = false;
    }
    this.addEventListener("tip-changed", this.handleTipChange);
  }

  disconnectedCallback() {
    this.removeEventListener("tip-changed", this.handleTipChange);
  }

  handleTipChange(event: Event) {
    const { value, type } = (<CustomEvent>event).detail;
    TipAPI.tip = Number(value);
  }
}

export default WebFormTip;