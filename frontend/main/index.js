import "./application.scss";
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";

export function start() {
  Rails.start();
  Turbolinks.start();
  console.log("Hello World from Webpacker");
}
