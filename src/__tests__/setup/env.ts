// import { JSDOM } from "jsdom";
// import * as Preact from "preact";
// import { act } from "react/test-utils";
// @ts-ignore
import { DOMParser, parseHTML } from "linkedom";
import { act, Simulate } from "react-dom/test-utils";
// import { ReactDOM } from 'react'
import ReactDOM from "react-dom";
import { createElement } from "react";
// Standard way: text/html, text/xml, image/svg+xml, etc...
// const document = (new DOMParser).parseFromString(html, 'text/html');

// Simplified way for HTML
// const { window } = new JSDOM('<main></main>');

export function setup() {
  const { window } = parseHTML(`<body><main></main></body>`);

  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle;
  // global.requestAnimationFrame = null;
}

// export function reset() {
//   window.document.title = "";
//   window.document.head.innerHTML = "";
//   ReactDOM.unmountComponentAtNode(window.document.querySelector("main"));
//   window.document.body.innerHTML = "<main></main>";
// }

/**
 * @typedef RenderOutput
 * @property container {HTMLElement}
 * @property component {Preact.VNode}
 */

/**
 * @return {RenderOutput}
 */
export function render(Tag: any, props = {}) {
  const container = window.document.querySelector("main");
  const component = createElement(Tag, props);
  //   const component = Preact.h(Tag, props);
  ReactDOM.render(component, container);
  //   Preact.render(component, container);
  return { container, component };
}

/**
 * @param {HTMLElement} elem
 * @param {String} event
 * @param {any} [details]
 */
export async function fire(elem, event, details = {}) {
  await act(() => {
    Simulate.click();
    let evt = new window.Event(event, details);
    elem.dispatchEvent(evt);
  });
}
