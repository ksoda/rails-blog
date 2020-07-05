import "../styles/application.pcss";
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";

require("alpinejs");

export function run() {
  Rails.start();
  Turbolinks.start();
  console.log("Hello World from Webpacker");
}
