const signups = require("./signup");

//username
test("username is less than 3 characters", () => {
  expect(signups.user("t")).toBe(false);
});

test("username has no numerical characters", () => {
  expect(signups.user("test")).toBe(true);
});

test("valid username", () => {
  expect(signups.user("test123")).toBe(true);
});

//email
test("invalid email - no @ symbol and numerical characters", () => {
  expect(signups.emails("testing")).toBe(false);
});

test("invalid email - no @ symbol", () => {
  expect(signups.emails("testing123")).toBe(false);
});

test("valid email", () => {
  expect(signups.emails("testing123@gmail.com")).toBe(true);
});

//password

test("password is less than 6 characters", () => {
  expect(signups.pass("test")).toBe(false);
});

test("password has no special or numerical characters", () => {
  expect(signups.pass("testing")).toBe(false);
});

test("valid password", () => {
  expect(signups.pass("testing123!")).toBe(true);
});
