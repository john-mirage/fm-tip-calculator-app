import WebTextInput from "@components/web-text-input";

class WebFormBill extends WebTextInput {  
  constructor() {
    super();
    this.titleElement.textContent = "Bill";
    this.labeElement.textContent = "Bill";
    this.useElement.setAttribute("href", "#icon-dollar");
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.inputElement.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    if (/\d/.test(event.key)) {
      console.log(event.key);
      this.inputElement.value += event.key;
    }
  }
}

export default WebFormBill;