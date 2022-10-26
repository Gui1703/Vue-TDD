import SignUpPage from "./SignUpPage.vue";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
  let button;

  describe("Layout", () => {
    it("has Sign Up Header", () => {
      render(SignUpPage);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).not.toBeNull();
    });

    it("has username input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Username");
      expect(input).not.toBeNull();
    });

    it("has email input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("E-mail");
      expect(input).not.toBeNull();
    });

    it("has password input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Password");
      expect(input).not.toBeNull();
    });

    it("has password type for password input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Password");
      expect(input.type).toBe("password");
    });

    it("has password repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Password Repeat");
      expect(input).not.toBeNull();
    });

    it("has password type for password repeat input", () => {
      render(SignUpPage);
      const input = screen.queryByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });

    it("has Sign Up Button", () => {
      render(SignUpPage);
      expect(button).not.toBeNull();
    });

    it("disables the button initially", () => {
      render(SignUpPage);
      expect(button).toBeDisabled;
    });
  });

  describe("Interactions", () => {
    let requestBody;
    const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
        requestBody = req.body;
        return res(ctx.status(200));
      })
    );

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    const setup = async () => {
      render(SignUpPage);
      const usernameInput = screen.queryByLabelText("Username");
      const emailInput = screen.queryByLabelText("E-mail");
      const passwordInput = screen.queryByLabelText("Password");
      const passwordRepeatInput = screen.queryByLabelText("Password Repeat");
      button = screen.queryByRole("button", { name: "Sign Up" });
      await userEvent.type(usernameInput, "user1");
      await userEvent.type(emailInput, "user1@mail.com");
      await userEvent.type(passwordInput, "P4ssword");
      await userEvent.type(passwordRepeatInput, "P4ssword");
    };

    it("enables the button when the password and password repeat fields have same values", async () => {
      await setup();
      expect(button).toBeEnabled;
    });

    it("sends username, email and password to backend after clicking the button", async () => {
      server.listen();
      await setup();
      await userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      await server.close();
      expect(requestBody).toEqual({
        username: "user1",
        email: "user1@mail.com",
        password: "P4ssword",
      });
    });

    it("does not allow clicking to the button when there is an ongoing api call", async () => {
      let counter = 0;
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          counter += 1;
          return res(ctx.status(200));
        })
      );
      server.listen();
      await setup();
      await userEvent.click(button);
      await server.close();
      expect(counter).toBe(1);
    });

    it("displays spinner while the api request in progress", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );
      server.listen();
      await setup();
      await userEvent.click(button);
      const spinner = screen.queryByRole("status");
      expect(spinner).toBeInTheDocument;
    });

    it("does not display spinner when there is no api request", async () => {
      await setup();
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument;
    });

    it("displays account activation information after successful sign up request", async () => {
      await setup();
      await userEvent.click(button);
      const text = await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(text).toBeInTheDocument;
    });

    it("does not display account activation message before sign up request", async () => {
      await setup();
      const text = await screen.queryByText(
        "Please check your e-mail to activate your account"
      );
      expect(text).not.toBeInTheDocument;
    });

    it("does not displays account activation information after failing sign up request", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(400));
        })
      );
      await setup();
      await userEvent.click(button);
      await server.close();
      const text = screen.queryByText(
        "Please check your e-mail to activate your account"
      );
      expect(text).not.toBeInTheDocument;
    });

    it("hides sign up form after successful sign up request", async () => {
      await setup();
      const form = screen.queryByTestId("form-sign-up");
      await userEvent.click(button);
      await waitFor(() => expect(form).not.toBeInTheDocument);
    });

    it("displays validation message for username", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              validationErrors: { username: "Username cannot be null" },
            })
          );
        })
      );
      await setup();
      await userEvent.click(button);
      await server.close();
      // const text = await screen.findByText("Username cannot be null");
      // expect(text).toBeInTheDocument();
    });

    it("hides spinner after error response received", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              validationErrors: { username: "Username cannot be null" },
            })
          );
        })
      );
      await setup();
      await userEvent.click(button);
      await server.close();
      screen.findByText("Username cannot be null");
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument;
    });

    it("enables the button after error response received", async () => {
      const server = setupServer(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              validationErrors: { username: "Username cannot be null" },
            })
          );
        })
      );
      await setup();
      await userEvent.click(button);
      await server.close();
      screen.findByText("Username cannot be null");
      expect(button).toBeEnabled;
    });
  });
});
