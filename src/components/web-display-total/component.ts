import WebDisplayRow from "@components/web-display-row";

class WebDisplayTotal extends WebDisplayRow {
  constructor() {
    super();
    this.titleElement.textContent = "Total";
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebDisplayTotal;