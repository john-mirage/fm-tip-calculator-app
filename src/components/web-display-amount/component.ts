import WebDisplayRow from "@components/web-display-row";

class WebDisplayAmount extends WebDisplayRow {
  constructor() {
    super();
    this.titleElement.textContent = "Tip Amount";
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebDisplayAmount;