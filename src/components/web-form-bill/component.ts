import WebTextInput from "@components/web-text-input";

class WebFormBill extends WebTextInput {  
  constructor() {
    super();
    this.titleElement.textContent = "Bill";
    this.labeElement.textContent = "Bill";
    this.useElement.setAttribute("href", "#icon-dollar");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebFormBill;