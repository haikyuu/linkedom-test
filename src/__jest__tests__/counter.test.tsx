import React from "react";
// Relies on `@babel/register`
import Count from "../Counter";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";

let container = null;
describe("TEST", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should render with "5" by default', () => {
    act(() => {
      render(<Count />, container);
    });
    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
    );
  });

  it("should accept custom `count` prop", () => {
    act(() => {
      render(<Count count={99} />, container);
    });
    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>99</span><button id="incr">++</button>`
    );
  });

  it("should increment count after `button#incr` click", () => {
    act(() => {
      render(<Count />, container);
    });

    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
    );
    act(() => {
      Simulate.click(container.querySelector("#incr"));
    });
    //   await ENV.fire(container.querySelector("#incr"), "click");

    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>6</span><button id="incr">++</button>`
    );
  });

  it("should decrement count after `button#decr` click", () => {
    act(() => {
      render(<Count />, container);
    });

    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
    );
    const decr = container.querySelector("#decr");
    act(() => {
      Simulate.click(decr);
    });
    expect(container.innerHTML).toEqual(
      `<button id="decr">--</button><span>4</span><button id="incr">++</button>`
    );
  });
});
