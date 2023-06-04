import { render, screen } from "@testing-library/vue";
import App from "./App.vue";
import { i18n } from "./locales/i18n";

const setup = (path) => {
  window.history.pushState({}, "", path);
  render(App, { global: { plugins: [i18n] } });
};

describe("Routing", () => {
  it.each`
    path                | pageTestId
    ${"/"}              | ${"home-page"}
    ${"/signup"}        | ${"signup-page"}
    ${"/login"}         | ${"login-page"}
    ${"/user/1"}        | ${"user-page"}
    ${"/user/2"}        | ${"user-page"}
    ${"/activate/1234"} | ${"activation-page"}
    ${"/activate/5678"} | ${"activation-page"}
  `("displays $pageTestId when path is $path", async ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument;
  });

  it.each`
    path               | pageTestId
    ${"/"}             | ${"signup-page"}
    ${"/"}             | ${"login-page"}
    ${"/"}             | ${"user-page"}
    ${"/"}             | ${"activation-page"}
    ${"/signup"}       | ${"home-page"}
    ${"/signup"}       | ${"login-page"}
    ${"/signup"}       | ${"user-page"}
    ${"/signup"}       | ${"activation-page"}
    ${"/login"}        | ${"home-page"}
    ${"/login"}        | ${"signup-page"}
    ${"/login"}        | ${"user-page"}
    ${"/login"}        | ${"activation-page"}
    ${"/user/1"}       | ${"home-page"}
    ${"/user/1"}       | ${"signup-page"}
    ${"/user/1"}       | ${"login-page"}
    ${"/user/1"}       | ${"activation-page"}
    ${"/activate/123"} | ${"signup-page"}
    ${"/activate/123"} | ${"home-page"}
    ${"/activate/123"} | ${"login-page"}
    ${"/activate/123"} | ${"user-page"}
  `(
    "does not display $pageTestId when path is $path",
    async ({ path, pageTestId }) => {
      setup(path);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument;
    }
  );
});
