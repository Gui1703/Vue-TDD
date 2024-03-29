import SignUpPage from "./SignUpPage.vue";
import LanguageSelector from "../components/LanguageSelector.vue";
import userEvent from "@testing-library/user-event";
import en from "../locales/en.json";
import pt from "../locales/pt.json";
import { i18n } from "../locales/i18n";
import { render, screen, waitFor } from "@testing-library/vue";
import { setupServer } from "msw/node";
import { rest } from "msw";

let requestBody;
let counter = 0;
let acceptLanguageHeader;
let button, passwordInput, passwordRepeatInput, usernameInput, emailInput;
const server = setupServer(
  rest.post("/api/1.0/users", (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    acceptLanguageHeader = req.headers.get("Accept-Language");
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

describe("SignUpPage", () => {
  describe("Layout", () => {
    const setup = () => {
      render(SignUpPage, {
        global: {
          plugins: [i18n],
        },
      });
    };

    it("has Sign Up Header", () => {
      setup();
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument;
    });

    it.each`
      label
      ${"Username"}
      ${"E-mail"}
      ${"Password"}
    `("has $label input", async ({ label }) => {
      setup();
      const input = screen.queryByLabelText(label);
      expect(input).toBeInTheDocument;
    });

    it("has password type for password input", () => {
      setup();
      const input = screen.queryByLabelText("Password");
      expect(input.type).toBe("password");
    });
    it("has password repeat input", () => {
      setup();
      const input = screen.queryByLabelText("Password Repeat");
      expect(input).toBeInTheDocument;
    });
    it("has password repeat type for password input", () => {
      setup();
      const input = screen.queryByLabelText("Password Repeat");
      expect(input.type).toBe("password");
    });
    it("has Sign Up Button", () => {
      setup();
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument;
    });
    it("disable the buttons initially", () => {
      setup();
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled;
    });
  });
  describe("Interaction", () => {
    const setup = async () => {
      render(SignUpPage, {
        global: {
          plugins: [i18n],
        },
      });
      usernameInput = screen.queryByLabelText("Username");
      emailInput = screen.queryByLabelText("E-mail");
      passwordInput = screen.queryByLabelText("Password");
      passwordRepeatInput = screen.queryByLabelText("Password Repeat");
      button = screen.queryByRole("button", { name: "Sign Up" });
      await userEvent.type(usernameInput, "user1");
      await userEvent.type(emailInput, "user1@mail.com");
      await userEvent.type(passwordInput, "P4ssword");
      await userEvent.type(passwordRepeatInput, "P4ssword");
    };

    const generateValidationError = (field, message) => {
      return rest.post("/api/1.0/users", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: {
              [field]: message,
            },
          })
        );
      });
    };

    it("enables the button when the password and password resets matchs", async () => {
      await setup();
      expect(button).toBeEnabled;
    });
    it("send username, email and password to backend after clicking the button", async () => {
      await setup();
      await userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(requestBody).toEqual({
        username: "user1",
        email: "user1@mail.com",
        password: "P4ssword",
      });
    });
    it("does not allow clicking to the button when there is an ongoing api call", async () => {
      await setup();
      await userEvent.click(button);
      // await userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(counter).toBe(1);
    });
    it("does not display spinner when there is no api request", async () => {
      await setup();
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument;
    });
    it("display account activation information after successful sign up request", async () => {
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
    it("does not display account activavtion information after failing sign up request", async () => {
      server.use(
        rest.post("/api/1.0/users", (req, res, ctx) => {
          return res(ctx.status(400));
        })
      );
      await setup();
      await userEvent.click(button);
      const text = screen.queryByText(
        "Please check your e-mail to activate your account"
      );
      expect(text).not.toBeInTheDocument;
    });
    it("hides sign up from after successful sign up request", async () => {
      await setup();
      const form = screen.queryByTestId("form-sign-up");
      await userEvent.click(button);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument;
      });
    });
    it.each`
      field         | message
      ${"username"} | ${"Username cannot be null"}
      ${"email"}    | ${"E-mail cannot be null"}
      ${"password"} | ${"Password cannot be null"}
    `("displays $message for field $field", async ({ field, message }) => {
      server.use(generateValidationError(field, message));
      await setup();
      await userEvent.click(button);
      const text = await screen.findByText(message);
      expect(text).toBeInTheDocument;
    });
    it("hides spinner after error response received", async () => {
      server.use(
        generateValidationError("username", "Username cannot be null")
      );
      await setup();
      await userEvent.click(button);
      await screen.findByText("Username cannot be null");
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument;
    });
    it("enables the button after error response received", async () => {
      server.use(
        generateValidationError("username", "Username cannot be null")
      );
      await setup();
      await userEvent.click(button);
      await screen.findByText("Username cannot be null");
      expect(button).toBeEnabled;
    });
    it("display mismatch message for password repeat input", async () => {
      await setup();
      await userEvent.type(passwordInput, "P4ss1");
      await userEvent.type(passwordRepeatInput, "P4ss2");
      const text = await screen.findByText("Password mismatch");
      expect(text).toBeInTheDocument;
    });
    it.each`
      field         | message                      | label
      ${"username"} | ${"Username cannot be null"} | ${"Username"}
      ${"email"}    | ${"E-mail cannot be null"}   | ${"E-mail"}
      ${"password"} | ${"Password cannot be null"} | ${"Password"}
    `(
      "clear validation error after field $field is updated",
      async ({ field, message, label }) => {
        server.use(generateValidationError(field, message));
        await setup();
        await userEvent.click(button);
        const text = await screen.findByText(message);
        const input = screen.queryByLabelText(label);
        await userEvent.type(input, "updated");
        expect(text).not.toBeInTheDocument;
      }
    );
  });

  describe("internationalization", () => {
    let portugueseLanguage,
      englishLanguage,
      username,
      email,
      password,
      passwordRepeat,
      button;

    const setup = async () => {
      const app = {
        components: {
          SignUpPage,
          LanguageSelector,
        },
        template: `
        <SignUpPage />
        <LanguageSelector />
        `,
      };

      render(app, {
        global: {
          plugins: [i18n],
        },
      });

      portugueseLanguage = screen.queryByTitle("Portuguese");
      englishLanguage = screen.queryByTitle("English");
      username = screen.queryByLabelText(en.username);
      email = screen.queryByLabelText(en.email);
      password = screen.queryByLabelText(en.password);
      passwordRepeat = screen.queryByLabelText(en.passwordRepeat);
      button = screen.queryByRole("button", { name: en.signUp });
    };

    afterEach(() => {
      i18n.global.locale = "en";
    });

    it("initially displays all text in English", async () => {
      await setup();
      expect(screen.queryByRole("heading", { name: en.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByRole("button", { name: en.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByLabelText(en.username)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.email)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.password)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.passwordRepeat)).toBeInTheDocument;
    });

    it("displays all text in Portuguese after selecting that language", async () => {
      await setup();

      await userEvent.click(portugueseLanguage);

      expect(screen.queryByRole("heading", { name: pt.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByRole("button", { name: pt.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByLabelText(pt.username)).toBeInTheDocument;
      expect(screen.queryByLabelText(pt.email)).toBeInTheDocument;
      expect(screen.queryByLabelText(pt.password)).toBeInTheDocument;
      expect(screen.queryByLabelText(pt.passwordRepeat)).toBeInTheDocument;
    });

    it("displays all text in English after page is translated to Portuguese", async () => {
      await setup();

      await userEvent.click(portugueseLanguage);
      await userEvent.click(englishLanguage);

      expect(screen.queryByRole("heading", { name: en.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByRole("button", { name: en.signUp }))
        .toBeInTheDocument;
      expect(screen.queryByLabelText(en.username)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.email)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.password)).toBeInTheDocument;
      expect(screen.queryByLabelText(en.passwordRepeat)).toBeInTheDocument;
    });

    it("displays password mismatch validation is Portuguese", async () => {
      setup();
      await userEvent.click(portugueseLanguage);
      await userEvent.type(password, "P4ssword");
      await userEvent.type(passwordRepeat, "N3wP4ss");
      const validation = screen.queryByText(pt.passwordMismatchValidation);
      expect(validation).toBeInTheDocument;
    });

    it("sends accept language having en to backend for sign up request", async () => {
      setup();

      await userEvent.type(username, "user1");
      await userEvent.type(email, "user1@mail.com");
      await userEvent.type(password, "P4ssword");
      await userEvent.type(passwordRepeat, "P4ssword");
      await userEvent.click(button);
      await screen.findByText(
        "Please check your e-mail to activate your account"
      );
      expect(acceptLanguageHeader).toBe("en");
    });

    it("sends accept language having pt after that language is selected", async () => {
      setup();

      await userEvent.click(portugueseLanguage);
      await userEvent.type(username, "user1");
      await userEvent.type(email, "user1@mail.com");
      await userEvent.type(password, "P4ssword");
      await userEvent.type(passwordRepeat, "P4ssword");
      await userEvent.click(button);
      await screen.findByText(pt.accountActivationNotification);
      expect(acceptLanguageHeader).toBe("en");
    });

    it("display account activation information in Portuguese after selecting that language", async () => {
      setup();
      await userEvent.click(portugueseLanguage);
      await userEvent.type(username, "user1");
      await userEvent.type(email, "email@mail.com");
      await userEvent.type(password, "P4ssword");
      await userEvent.type(passwordRepeat, "P4ssword");
      await userEvent.click(button);
      const accountActivation = await screen.findByText(
        pt.accountActivationNotification
      );
      expect(accountActivation).toBeInTheDocument;
    });
  });
});
