import "./application.pcss";
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";

import "alpinejs";

export function start() {
  Rails.start();
  Turbolinks.start();
  console.log("Hello World from Webpacker");
}
