import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import reactLogo from "./assets/react.svg";
import tauriLogo from "./assets/tauri.svg";
import litLogo from "./assets/lit.svg";
import vclusterLogo from "./assets/cluster.svg";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("splash-screen")
export class SplashScreen extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Managing cluster of apps has never been easier !";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <div class="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src=${reactLogo} class="logo react" alt="React logo" />
        </a>
        <a href="https://vcluster.dev" target="_blank">
          <img src=${vclusterLogo} class="logo vcluster" alt="Vcluster logo" />
        </a>
        <a href="https://tauri.dev" target="_blank">
          <img src=${tauriLogo} class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          See detials on official website
        </button>
      </div>
      <div class="loading-wrapper">
        <loading-live></loading-live>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vcluster {
      animation: vcluster-logo-spin infinite 20s linear;
    }
    .logo.vcluster:hover {
      filter: drop-shadow(0 0 2em #7892fbaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      margin-top: 2em;
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }

    @keyframes vcluster-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .logos .logo {
      animation: logo-beat 10s infinite linear,
        vcluster-logo-spin infinite 20s linear;
    }

    .logos {
      .logo.react {
        animation-delay: 0s;
      }
      .logo.vcluster {
        animation-delay: -2.5s;
      }
      .logo.tauri {
        animation-delay: -5s;
      }
      .logo.lit {
        animation-delay: -7.5s;
      }
    }

    @keyframes logo-beat {
      50% {
        scale: 0.75;
        opacity: 0.2;
      }

      100% {
        opacity: 1;
        scale: 1;
      }
    }

    .loading-wrapper {
      display: flex;
      justify-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "splash-screen": SplashScreen;
  }
}
