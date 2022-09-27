import "./main.css";

import WebApp from "@components/web-app";
import WebForm from "@components/web-form";
import WebTextInput from "@components/web-text-input";
import WebRadioGroup from "@components/web-radio-group";
import WebRadioInput from "@components/web-radio-input";
import WebCustomRadioInput from "@components/web-custom-radio-input";
import WebDisplay from "@components/web-display";
import WebDisplayRow from "@components/web-display-row";

customElements.define("web-app", WebApp);
customElements.define("web-form", WebForm);
customElements.define("web-text-input", WebTextInput);
customElements.define("web-radio-group", WebRadioGroup);
customElements.define("web-radio-input", WebRadioInput);
customElements.define("web-custom-radio-input", WebCustomRadioInput);
customElements.define("web-display", WebDisplay);
customElements.define("web-display-row", WebDisplayRow);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");
app?.append(webApp);