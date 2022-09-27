import "./main.css";

import WebApp from "@components/web-app";
import WebForm from "@components/web-form";
import WebDisplay from "@components/web-display";

customElements.define("web-app", WebApp);
customElements.define("web-form", WebForm);
customElements.define("web-display", WebDisplay);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");
app?.append(webApp);