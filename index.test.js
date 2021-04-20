const { run } = require("jest");
const utils = require("./index");

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("[Exercise 1] trimProperties", () => {
  test("[1] returns an object with the properties trimmed", () => {
    // EXAMPLE
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    const expected = { foo: "foo", bar: "bar", baz: "baz" };
    const actual = utils.trimProperties(input);
    expect(actual).toEqual(expected);
  });
  test("[2] returns a copy, leaving the original object intact", () => {
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    const result = utils.trimProperties(input); //eslint-disable-line
    expect(input).toEqual({ foo: "  foo ", bar: "bar ", baz: " baz" });
  });
});

describe("[Exercise 2] trimPropertiesMutation", () => {
  test("[3] returns an object with the properties trimmed", () => {
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    const trimmed = utils.trimProperties(input);
    const runner = utils.trimPropertiesMutation(input); //eslint-disable-line
    expect(input).toEqual(trimmed);
    expect(runner).toBe(input);
  });
  test("[4] the object returned is the exact same one we passed in", () => {
    const input = { foo: "   dddfoo ", bar: " dbar ", baz: " bdaz" };
    const runner = utils.trimPropertiesMutation(input); //eslint-disable-line
    expect(input).not.toEqual({
      foo: "   dddfoo ",
      bar: " dbar ",
      baz: " bdaz",
    });
  });
});

describe("[Exercise 3] findLargestInteger", () => {
  test("[5] returns the largest number in an array of objects { integer: 2 }", () => {
    const input = [
      { integer: -99999 },
      { integer: -6 },
      { integer: 8 },
      { integer: -8888 },
    ];
    const result = utils.findLargestInteger(input);
    expect(result).toEqual(8);
  });
});

describe("[Exercise 4] Counter", () => {
  let counter;
  beforeEach(() => {
    counter = new utils.Counter(3); // each test must start with a fresh counter
  });
  test("[6] the FIRST CALL of counter.countDown returns the initial count", () => {
    expect(counter.countDown()).toEqual(3);
  });
  test("[7] the SECOND CALL of counter.countDown returns the initial count minus one", () => {
    counter.countDown();
    expect(counter.countDown()).toEqual(2);
  });
  test("[8] the count eventually reaches zero but does not go below zero", () => {
    counter.countDown();
    counter.countDown();
    expect(counter.countDown()).toEqual(1);
    expect(counter.countDown()).toEqual(0);
    expect(counter.countDown()).toEqual(0);
  });
});
describe("[Exercise 5] Seasons", () => {
  let seasons;
  function runSeasons(runs) {
    let counter = 0;
    while (counter < runs - 1) {
      seasons.next();
      counter++;
    }
  }
  beforeEach(() => {
    seasons = new utils.Seasons(); // each test must start with fresh seasons
  });
  test('[9] the FIRST call of seasons.next returns "summer"', () => {
    expect(seasons.next()).toEqual("summer");
  });
  test('[10] the SECOND call of seasons.next returns "fall"', () => {
    runSeasons(2);
    expect(seasons.next()).toEqual("fall");
  });
  test('[11] the THIRD call of seasons.next returns "winter"', () => {
    runSeasons(3);
    expect(seasons.next()).toEqual("winter");
  });
  test('[12] the FOURTH call of seasons.next returns "spring"', () => {
    runSeasons(4);
    expect(seasons.next()).toEqual("spring");
  });
  test('[13] the FIFTH call of seasons.next returns again "summer"', () => {
    runSeasons(5);
    expect(seasons.next()).toEqual("summer");
  });
  test('[14] the 40th call of seasons.next returns "spring"', async () => {
    runSeasons(40);
    expect(seasons.next()).toEqual("spring");
  });
});

describe("[Exercise 6] Car", () => {
  let focus;
  beforeEach(() => {
    focus = new utils.Car("focus", 20, 30); // each test must start with a fresh car
  });
  test("[15] driving the car returns the updated odometer", () => {
    focus.drive(50);
    expect(focus.odometer).toEqual(50);
  });
  test("[16] driving the car uses gas", () => {
    focus.drive(300);
    expect(focus.tank).toBeLessThan(20);
  });
  test("[17] refueling allows to keep driving", () => {
    let fullDrive = focus.drive(600);
    let res = focus.drive(1);
    expect(fullDrive).toEqual(600);
    expect(res).toMatch(/no distance/);
  });
  test("[18] adding fuel to a full tank has no effect", () => {
    let result = focus.refuel(10);
    expect(result).toMatch(/only holds/);
    expect(focus.tank).toEqual(focus.tankSize);
  });
});

describe("[Exercise 7] isEvenNumberAsync", () => {
  test("[19] resolves true if passed an even number", async () => {
    let check = await utils.isEvenNumberAsync(6);
    expect(check).toEqual(true);
  });
  test("[20] resolves false if passed an odd number", async () => {
    let check = await utils.isEvenNumberAsync(7);
    expect(check).toEqual(false);
  });
  test('[21] rejects an error with the message "number must be a number" if passed a non-number type', async () => {
    let check = await utils.isEvenNumberAsync("Hello");
    expect(check).toMatch(/must be a number/);
  });
  test('[22] rejects an error with the message "number must be a number" if passed NaN', async () => {
    let check = await utils.isEvenNumberAsync(NaN);
    expect(check).toMatch(/must be a number/);
  });
});
