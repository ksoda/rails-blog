import "../styles/application.scss";
import Turbolinks from "turbolinks";

require("alpinejs");

export function run() {
  Turbolinks.start();
  console.log("Hello World from Webpacker");
}
