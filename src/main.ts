import "./main.css";

import WebApp from "@components/web-app";
import WebForm from "@components/web-form";
import WebFormBill from "@components/web-form-bill";
import WebFormTip from "@components/web-form-tip";
import WebFormTipRadio from "@components/web-form-tip-radio";
import WebFormTipCustomRadio from "@components/web-form-tip-custom-radio";
import WebFormPeople from "@components/web-form-people";
import WebDisplay from "@components/web-display";
import WebDisplayTipAmount from "@components/web-display-tip-amount";
import WebDisplayTotal from "@components/web-display-total";

customElements.define("web-app", WebApp);
customElements.define("web-form", WebForm);
customElements.define("web-form-bill", WebFormBill);
customElements.define("web-form-tip", WebFormTip);
customElements.define("web-form-tip-radio", WebFormTipRadio);
customElements.define("web-form-tip-custom-radio", WebFormTipCustomRadio);
customElements.define("web-form-people", WebFormPeople);
customElements.define("web-display", WebDisplay);
customElements.define("web-display-tip-amount", WebDisplayTipAmount);
customElements.define("web-display-total", WebDisplayTotal);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");
app?.append(webApp);