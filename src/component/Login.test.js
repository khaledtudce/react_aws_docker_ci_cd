import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login/Login";
import mockAxios from "axios";

mockAxios.get.mockImplementation(() =>
  Promise.resolve({ data: { id: 1, name: "John" } })
);

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("username value should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/password/i);
  expect(userInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByRole("button");
  expect(userInputEl).toBeInTheDocument();
});

test("button should be disabled", () => {
  render(<Login />);
  const userInputEl = screen.getByRole("button");
  expect(userInputEl).toBeDisabled();
});

test("error message should not show initially", () => {
  render(<Login />);
  const userInputEl = screen.getByTestId("error");
  expect(userInputEl).not.toBeVisible();
});

test("username value should change when provided", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("password input should change when provided", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("Login button should be visible when user and password provided", () => {
  render(<Login />);
  const userInputButton = screen.getByRole("button");
  expect(userInputButton).toBeDisabled();

  const userInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInput, { target: { value: testValue } });

  const userPassword = screen.getByPlaceholderText(/password/i);
  fireEvent.change(userPassword, { target: { value: testValue } });
  expect(userInputButton).toBeEnabled();
});

test("Login button should contain please wait when user and password provided", () => {
  render(<Login />);
  const userInputButton = screen.getByRole("button");
  expect(userInputButton).toBeDisabled();

  const userInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInput, { target: { value: testValue } });

  const userPassword = screen.getByPlaceholderText(/password/i);
  fireEvent.change(userPassword, { target: { value: testValue } });
  expect(userInputButton).toBeEnabled();

  fireEvent.click(userInputButton);
  expect(userInputButton).toHaveTextContent(/please wait/i);
});

test("Login button should not contain please wait after user and password provided", async () => {
  render(<Login />);
  const userInputButton = screen.getByRole("button");
  expect(userInputButton).toBeDisabled();

  const userInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInput, { target: { value: testValue } });

  const userPassword = screen.getByPlaceholderText(/password/i);
  fireEvent.change(userPassword, { target: { value: testValue } });
  expect(userInputButton).toBeEnabled();

  fireEvent.click(userInputButton);
  await waitFor(() =>
    expect(userInputButton).not.toHaveTextContent(/please wait/i)
  );
});
