import { test, suite } from "uvu";
import * as assert from "uvu/assert";
import * as ENV from "./setup/env";

// Relies on `@babel/register`
import Count from "../Counter";
import { act, Simulate } from "react-dom/test-utils";
import { parseError, ValidationError } from "../errorHandler";
test.before.each(ENV.setup);
// test.before.each(ENV.reset);

test('should render with "5" by default', () => {
  const { container } = ENV.render(Count);

  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
  );
});

test("should accept custom `count` prop", () => {
  const { container } = ENV.render(Count, { count: 99 });

  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>99</span><button id="incr">++</button>`
  );
});

test("should increment count after `button#incr` click", async () => {
  const { container } = ENV.render(Count);

  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>5</span><button id="incr">++</button>`
  );
  act(() => {
    Simulate.click(container.querySelector("#incr"));
  });
  //   await ENV.fire(container.querySelector("#incr"), "click");

  assert.snapshot(
    container.innerHTML,
    `<button id="decr">--</button><span>6</span><button id="incr">++</button>`
  );
});

test("should decrement count after `button#decr` click", async () => {
  const { container } = ENV.render(Count);

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
const errors: ValidationError[] = [
  {
    loc: ["body", "pwd"],
    msg: "ensure this value has at least 8 characters",
    type: "",
  },
];
test("parse Error should work without map", () => {
  assert.equal(parseError(errors)[0], `Error: ${errors[0].msg}`);
});
test("parse Error should work with map 2", () => {
  const val = parseError(errors, { pwd: "Password" })[0];
  // expect(val.trim()).to.equal(`Error: ${errors[0].msg}`);
  assert.equal(val, `Error: ${errors[0].msg}`);
});
test.run();
