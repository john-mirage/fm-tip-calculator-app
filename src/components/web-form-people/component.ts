import WebTextInput from "@components/web-text-input";

class WebFormPeople extends WebTextInput {  
  constructor() {
    super();
    this.titleElement.textContent = "Number of People";
    this.labeElement.textContent = "Number of People";
    this.useElement.setAttribute("href", "#icon-people");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebFormPeople;