import * as view from "./view.js";
import Grid from "./grid.js";

window.addEventListener("load",start)

function start() {
  const model = new Grid(10, 10, 0.2);
  view.initView(model);
  console.log("model:", model);

  // setInterval(() => {

  // }, 5000);
}
