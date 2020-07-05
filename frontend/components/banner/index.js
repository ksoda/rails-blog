import { LitElement, html, property, customElement } from "lit-element";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  @property() message = undefined;

  // Light DOM
  createRenderRoot() {
    return this;
  }

  render() {
    if (this.message.trim().length === 0) return;
    return html`
      <div
        class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
        role="alert"
      >
        <p>${this.message}</p>
      </div>
    `;
  }
}
