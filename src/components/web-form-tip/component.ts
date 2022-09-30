import TipAPI from "@api/tip-api";
import WebFormTipCustomRadio from "@components/web-form-tip-custom-radio";
import WebFormTipRadio from "@components/web-form-tip-radio";
import "./style.css";

class WebFormTip extends HTMLElement {
  #initialMount = true;
  #templateFragment: DocumentFragment;
  #webFormTipRadios: NodeListOf<WebFormTipRadio>;
  #webFormTipCustomRadio: WebFormTipCustomRadio;

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-form-tip");
    this.#templateFragment = <DocumentFragment>template.content.cloneNode(true);
    this.#webFormTipRadios = <NodeListOf<WebFormTipRadio>>this.#templateFragment.querySelectorAll('[data-js="radio"]');
    this.#webFormTipCustomRadio = <WebFormTipCustomRadio>this.#templateFragment.querySelector('[data-js="custom-radio"]');
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCustomRadioChange = this.handleCustomRadioChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
  }

  get tip(): string {
    return TipAPI.tip;
  }

  set tip(newTip: string) {
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
    this.addEventListener("custom-tip-changed", this.handleCustomRadioChange);
  }

  disconnectedCallback() {
    TipAPI.unsubscribe(this);
    this.removeEventListener("tip-changed", this.handleRadioChange);
    this.removeEventListener("custom-tip-changed", this.handleCustomRadioChange);
  }

  handleTipChange() {
    const newTip = this.tip;
    const webFormTipRadios = Array.from(this.#webFormTipRadios);
    if (this.tip.length > 0) {
      const tipRadioInput = webFormTipRadios.find((radioInput) => radioInput.value === newTip);
      if (tipRadioInput) {
        tipRadioInput.checked = true;
      } else {
        this.#webFormTipCustomRadio.value = newTip;
      }
    } else {
      webFormTipRadios.forEach((webFormTipRadio) => {
        if (webFormTipRadio.checked) webFormTipRadio.checked = false;
      });
      this.#webFormTipCustomRadio.value = "";
    }
  }

  handleRadioChange(event: Event) {
    const { value } = (<CustomEvent>event).detail;
    this.#webFormTipCustomRadio.value = "";
    this.tip = value;
  }

  handleCustomRadioChange(event: Event) {
    const { value } = (<CustomEvent>event).detail;
    this.tip = value;
  }
}

export default WebFormTip;