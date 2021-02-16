import { test } from "uvu";
import * as assert from "uvu/assert";
import React from "react";
import Count from "../Counter";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { parseHTML } from "linkedom";

function setup() {
  const { window } = parseHTML(`<body><main></main></body>`);

  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle;
}

test.before(setup);

let container = null;
test.before.each(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
test.after.each(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
test('should render with "5" by default', () => {
  act(() => {
    render(<Count />, container);
  });
  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
  );
});

test("should accept custom `count` prop", () => {
  act(() => {
    render(<Count count={99} />, container);
  });
  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>99</span><button id="incr">++</button>`
  );
});

test("should increment count after `button#incr` click", async () => {
  act(() => {
    render(<Count />, container);
  });
  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
  );
  act(() => {
    Simulate.click(container.querySelector("#incr"));
  });

  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>6</span><button id="incr">++</button>`
  );
});

test("should decrement count after `button#decr` click", async () => {
  act(() => {
    render(<Count />, container);
  });
  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
  );
  const decr = container.querySelector("#decr");
  act(() => {
    Simulate.click(decr);
  });
  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>4</span><button id="incr">++</button>`
  );
});

test.run();
